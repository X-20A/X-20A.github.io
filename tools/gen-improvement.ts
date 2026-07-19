import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import type { Equipment, Phase } from '../src/data/types';

const REPO_ROOT = resolve(import.meta.dirname, '..');
const DEFAULT_SRC = resolve(REPO_ROOT, '../akashi-list/detail');
const OUT_PATH = join(REPO_ROOT, 'src/data/improvement.ts');

/** MAX 行が複数ある装備は更新先が複数あるが、Equipment 型は 1 つしか持てないので先頭を採る */
const MAX_ROW_PICK = 'first';

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

function parseEquipment(html: string, file: string): Equipment | null {
	const table = sliceResourceTable(html);
	if (table === null) return null; // 改修不可

	const identity = parseIdentity(html, file);
	if (identity === null) return null;

	const rows = [
		...table.matchAll(
			/<th class=border-right[^>]*>([^<]*)<\/th><td>([^<]*)<\/td><td>([^<]*)<\/td>/g,
		),
	].map((row) => ({ star: decodeEntities(row[1]), kit: row[3] }));

	const pick = (star: string) => {
		const hit = rows.filter((row) => row.star === star);
		if (hit.length === 0) return null;
		if (hit.length > 1 && star === 'MAX') {
			warn(file, `MAX 行が ${hit.length} 本ある（更新先が複数）。${MAX_ROW_PICK} を採用`);
		}
		return hit[0].kit;
	};

	const cells = {
		toSix: pick('0 ～ 5'),
		toTen: pick('6 ～ 9'),
		upgrade: pick('MAX'),
	};

	const cost = {} as Equipment['cost'];
	for (const [key, cell] of Object.entries(cells) as [keyof Equipment['cost'], string | null][]) {
		if (cell === null) {
			// 行そのものが無い ＝ まだ解析が出ていない
			warn(file, `${key} の行が見つからなかったので unknown 扱い`);
			cost[key] = { status: 'unknown' };
			continue;
		}
		const phase = parsePhase(cell, file, key);
		if (phase === null) return null;
		cost[key] = phase;
	}

	return { id: identity.id, name: identity.name, cost };
}

function serializePhase(phase: Phase): string {
	if (phase.status === 'available') {
		return `{ status: 'available', screws: ${phase.screws}, certainScrews: ${phase.certainScrews} }`;
	}
	return `{ status: '${phase.status}' }`;
}

function serialize(equipments: Equipment[]): string {
	const entries = equipments
		.map(
			(equipment) => `	{
		id: ${equipment.id},
		name: '${equipment.name.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}',
		cost: {
			toSix: ${serializePhase(equipment.cost.toSix)},
			toTen: ${serializePhase(equipment.cost.toTen)},
			upgrade: ${serializePhase(equipment.cost.upgrade)},
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
