import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import type { Equipment, Phase, Upgrade, UpgradeCost } from '../src/data/types';

const REPO_ROOT = resolve(import.meta.dirname, '..');
const DEFAULT_SRC = resolve(REPO_ROOT, '../akashi-list/detail');
const OUT_PATH = join(REPO_ROOT, 'src/data/improvement.ts');

/**
 * 同じ更新先が条件違いで複数並ぶ装備に、手で付ける注記。装備ID → 更新先の順に対応する注記。
 * HTML の「二番艦指定」を機械的に取り込むほどの件数ではないので、例外として持つ。
 * 未登録の同名衝突は実行時に警告が出るので、増えてきたら取り込み方を考え直す。
 */
const UPGRADE_NOTES: Record<number, readonly string[]> = {
	// 二番艦指定 吹雪ほか / 浦波ほか で必要ネジが変わる
	297: ['秘書: 吹雪', '秘書: 浦波'],
};

type Warning = { file: string; message: string };

const warnings: Warning[] = [];
const warn = (file: string, message: string) => warnings.push({ file, message });

/** HTML の実体参照のうち、装備名に実際に現れるものだけを戻す */
function decodeEntities(html: string): string {
	return html
		.replace(/&#(\d+);/g, (_, code: string) => String.fromCodePoint(Number(code)))
		.replace(/&#x([0-9a-f]+);/gi, (_, code: string) => String.fromCodePoint(parseInt(code, 16)))
		.replace(/&nbsp;/g, ' ')
		.replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>')
		.replace(/&quot;/g, '"')
		.replace(/&amp;/g, '&')
		.trim();
}

/**
 * 「改修必要資材」テーブルの中身だけを切り出す。
 * 見出しから直近の </table> までが 1 テーブルで、入れ子は無い。
 */
function sliceResourceTable(html: string): string | null {
	const head = html.indexOf('改修必要資材');
	if (head === -1) return null;
	const end = html.indexOf('</table>', head);
	if (end === -1) return null;
	return html.slice(head, end);
}

/** 装備 ID と名前。<span class=no>No.001 </span>種別 <span class=wname>名前</span> */
function parseIdentity(html: string, file: string): { id: number; name: string } | null {
	const id = html.match(/<span class=no>No\.(\d+)\s*<\/span>/);
	const name = html.match(/<span class=wname>(.*?)<\/span>/);
	if (!id || !name) {
		warn(file, '装備名/IDのヘッダを認識できなかった');
		return null;
	}
	return { id: Number(id[1]), name: decodeEntities(name[1]) };
}

/**
 * 改修資材セルの文字列を Phase に変換する。
 * "-" は更新先なし。"7/ 9" のように空白が崩れている実データがあるので緩く読む。
 */
function parsePhase(cell: string, file: string, label: string): Phase | null {
	const text = decodeEntities(cell);
	if (text === '-') return { status: 'none' };

	const matched = text.match(/^(\d+)\s*\/\s*(\d+)$/);
	if (!matched) {
		warn(file, `${label} の改修資材セルを解釈できなかった: ${JSON.stringify(text)}`);
		return null;
	}
	return {
		status: 'available',
		screws: Number(matched[1]),
		certainScrews: Number(matched[2]),
	};
}

/** ★区分の行と、更新先を示す <tr class=upgrade> を、テーブルに現れる順に拾う */
type TableRow =
	| { kind: 'star'; star: string; kit: string }
	| { kind: 'upgradeTo'; to: { id: number; name: string } | null };

function parseRows(table: string, file: string): TableRow[] {
	const rows: TableRow[] = [];
	// <tr で分割すれば、各チャンクがそのまま1行分になる
	for (const chunk of table.split('<tr').slice(1)) {
		const star = chunk.match(
			/^[^>]*><th class=border-right[^>]*>([^<]*)<\/th><td>([^<]*)<\/td><td>([^<]*)<\/td>/,
		);
		if (star) {
			rows.push({ kind: 'star', star: decodeEntities(star[1]), kit: star[3] });
			continue;
		}
		if (!/^[^>]*class=upgrade[^>]*>/.test(chunk)) continue;

		// 自装備は <figure>、更新先だけが <a data-wid=...> で表される
		const to = chunk.match(/<a data-wid=w\d+[^>]*title="(\d+):\s*([^"]*)"/);
		if (!to) {
			warn(file, '更新先の行から更新先装備を読み取れなかった');
			rows.push({ kind: 'upgradeTo', to: null });
			continue;
		}
		rows.push({ kind: 'upgradeTo', to: { id: Number(to[1]), name: decodeEntities(to[2]) } });
	}
	return rows;
}

/**
 * MAX 行を集めて UpgradeCost にする。
 * MAX 行の直後の <tr class=upgrade> がその更新先。"-" の MAX 行には更新先が続かない。
 */
function parseUpgrade(rows: TableRow[], file: string): UpgradeCost | null {
	const upgrades: Upgrade[] = [];
	let sawMax = false;

	for (const [index, row] of rows.entries()) {
		if (row.kind !== 'star' || row.star !== 'MAX') continue;
		sawMax = true;

		const phase = parsePhase(row.kit, file, 'upgrade');
		if (phase === null) return null;
		if (phase.status !== 'available') continue; // "-" ＝ 更新先なし

		const next = rows[index + 1];
		if (next?.kind !== 'upgradeTo' || next.to === null) {
			warn(file, 'MAX 行に対応する更新先が見つからなかった');
			return null;
		}
		upgrades.push({ to: next.to, screws: phase.screws, certainScrews: phase.certainScrews });
	}

	if (!sawMax) {
		warn(file, 'upgrade の行が見つからなかったので unknown 扱い');
		return { status: 'unknown' };
	}
	return upgrades.length === 0 ? { status: 'none' } : { status: 'available', upgrades };
}

function parseEquipment(html: string, file: string): Equipment | null {
	const table = sliceResourceTable(html);
	if (table === null) return null; // 改修不可

	const identity = parseIdentity(html, file);
	if (identity === null) return null;

	const rows = parseRows(table, file);

	const pickStar = (star: string, key: 'toSix' | 'toTen'): Phase | null => {
		const hit = rows.find(
			(row): row is Extract<TableRow, { kind: 'star' }> =>
				row.kind === 'star' && row.star === star,
		);
		if (hit === undefined) {
			// 行そのものが無い ＝ まだ解析が出ていない
			warn(file, `${key} の行が見つからなかったので unknown 扱い`);
			return { status: 'unknown' };
		}
		return parsePhase(hit.kit, file, key);
	};

	const toSix = pickStar('0 ～ 5', 'toSix');
	const toTen = pickStar('6 ～ 9', 'toTen');
	const upgrade = parseUpgrade(rows, file);
	if (toSix === null || toTen === null || upgrade === null) return null;

	if (upgrade.status === 'available') {
		annotateUpgrades(identity.id, upgrade.upgrades, file);
	}
	return { id: identity.id, name: identity.name, cost: { toSix, toTen, upgrade } };
}

/** 同名の更新先が並ぶ装備に注記を付ける。未登録なら警告して気付けるようにする */
function annotateUpgrades(id: number, upgrades: Upgrade[], file: string) {
	const names = upgrades.map((upgrade) => upgrade.to.name);
	if (new Set(names).size === names.length) return; // 名前だけで見分けられる

	const notes = UPGRADE_NOTES[id];
	if (notes === undefined || notes.length !== upgrades.length) {
		warn(file, `更新先が同名で並ぶが UPGRADE_NOTES に注記が無い: ${names.join(' / ')}`);
		return;
	}
	for (const [index, upgrade] of upgrades.entries()) {
		upgrade.note = notes[index];
	}
}

const quote = (text: string) => `'${text.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;

function serializePhase(phase: Phase): string {
	if (phase.status === 'available') {
		return `{ status: 'available', screws: ${phase.screws}, certainScrews: ${phase.certainScrews} }`;
	}
	return `{ status: '${phase.status}' }`;
}

function serializeUpgrade(cost: UpgradeCost): string {
	if (cost.status !== 'available') {
		return `{ status: '${cost.status}' }`;
	}
	// cost: { upgrade: ... } の位置に埋め込まれるので、インデントは4タブ始まり
	const upgrades = cost.upgrades
		.map(
			(upgrade) =>
				`					{ to: { id: ${upgrade.to.id}, name: ${quote(upgrade.to.name)} }, screws: ${upgrade.screws}, certainScrews: ${upgrade.certainScrews}${upgrade.note === undefined ? '' : `, note: ${quote(upgrade.note)}`} },`,
		)
		.join('\n');
	return `{
				status: 'available',
				upgrades: [
${upgrades}
				],
			}`;
}

function serialize(equipments: Equipment[]): string {
	const entries = equipments
		.map(
			(equipment) => `	{
		id: ${equipment.id},
		name: ${quote(equipment.name)},
		cost: {
			toSix: ${serializePhase(equipment.cost.toSix)},
			toTen: ${serializePhase(equipment.cost.toTen)},
			upgrade: ${serializeUpgrade(equipment.cost.upgrade)},
		},
	},`,
		)
		.join('\n');

	return `import type { Equipment } from './types';

/**
 * 改修工廠のネジ消費データ。改修可能な装備のみを収録する。
 * satisfies により、各エントリの構造は vue-tsc で検証される。
 *
 * このファイルは tools/gen-improvement.ts が akashi-list/detail から生成する。手で編集しない。
 */
export const IMPROVEMENT_DATAS = [
${entries}
] satisfies Equipment[];
`;
}

/** 既存 improvement.ts に載っている装備 ID（差分表示用） */
async function readExistingIds(): Promise<Set<number>> {
	try {
		const source = await readFile(OUT_PATH, 'utf-8');
		return new Set([...source.matchAll(/^\t\tid: (\d+),$/gm)].map((m) => Number(m[1])));
	} catch {
		return new Set();
	}
}

async function main() {
	const argv = process.argv.slice(2);
	const check = argv.includes('--check');
	const srcIndex = argv.indexOf('--src');
	const srcDir = srcIndex === -1 ? DEFAULT_SRC : resolve(argv[srcIndex + 1]);

	const files = (await readdir(srcDir)).filter((name) => /^w\d+\.html$/.test(name)).sort();
	if (files.length === 0) {
		console.error(`detail の html が見つからない: ${srcDir}`);
		process.exit(1);
	}

	const equipments: Equipment[] = [];
	for (const file of files) {
		const html = await readFile(join(srcDir, file), 'utf-8');
		const equipment = parseEquipment(html, file);
		if (equipment !== null) equipments.push(equipment);
	}
	equipments.sort((a, b) => a.id - b.id);

	const before = await readExistingIds();
	const after = new Set(equipments.map((equipment) => equipment.id));

	const added = equipments.filter((equipment) => !before.has(equipment.id));
	const removed = [...before].filter((id) => !after.has(id));

	console.log(`走査 ${files.length} 件 / 改修可能 ${equipments.length} 件`);
	console.log(`追加 ${added.length} 件, 削除 ${removed.length} 件`);
	if (added.length > 0) {
		console.log(`  追加: ${added.map((e) => `${e.id} ${e.name}`).join(', ')}`);
	}
	if (removed.length > 0) {
		console.log(`  削除: ${removed.join(', ')}`);
	}

	const multi = equipments.filter(
		(equipment) =>
			equipment.cost.upgrade.status === 'available' && equipment.cost.upgrade.upgrades.length > 1,
	);
	if (multi.length > 0) {
		console.log(`更新先が複数 ${multi.length} 件:`);
		for (const equipment of multi) {
			const upgrade = equipment.cost.upgrade;
			if (upgrade.status !== 'available') continue;
			const targets = upgrade.upgrades
				.map((entry) => `${entry.to.name}(${entry.screws}/${entry.certainScrews})`)
				.join(' , ');
			console.log(`  ${equipment.id} ${equipment.name} → ${targets}`);
		}
	}

	if (warnings.length > 0) {
		console.log(`\n要確認 ${warnings.length} 件:`);
		for (const { file, message } of warnings) console.log(`  ${file}: ${message}`);
	}

	if (check) {
		console.log('\n--check のため書き込みはしていない');
		return;
	}
	await writeFile(OUT_PATH, serialize(equipments), 'utf-8');
	console.log(`\n書き込み完了: ${OUT_PATH}`);
}

await main();
