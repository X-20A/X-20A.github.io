import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const BANNER_OUTPUT_DIR = path.resolve(process.cwd(), "public/banners");
const BANNER_BASE_URL =
	"https://raw.githubusercontent.com/noro6/kc-web/main/public/img/ship/banner";

const normalizeBannerIds = (args: string[]): number[] => {
	const values = args
		.flatMap((arg) => arg.split(","))
		.map((value) => value.trim())
		.filter((value) => value.length > 0)
		.map((value) => {
			const parsed_value = Number(value);

			if (!Number.isInteger(parsed_value) || parsed_value <= 0) {
				throw new Error(`無効な数値です: ${value}`);
			}

			return parsed_value;
		});

	return Array.from(new Set(values));
};

const downloadBanner = async (bannerId: number): Promise<void> => {
	const banner_url = `${BANNER_BASE_URL}/${bannerId}.png`;
	const response = await fetch(banner_url);

	if (!response.ok) {
		throw new Error(
			`ダウンロードに失敗しました: ${banner_url} (${response.status})`,
		);
	}

	const banner_buffer = Buffer.from(await response.arrayBuffer());
	const output_path = path.join(BANNER_OUTPUT_DIR, `${bannerId}.png`);

	await writeFile(output_path, banner_buffer);
	console.log(`保存しました: ${output_path}`);
};

const main = async (): Promise<void> => {
	const banner_ids = normalizeBannerIds(process.argv.slice(2));

	if (banner_ids.length === 0) {
		throw new Error("数値の配列を引数で指定してください");
	}

	await mkdir(BANNER_OUTPUT_DIR, { recursive: true });

	for (const banner_id of banner_ids) {
		await downloadBanner(banner_id);
	}
};

main().catch((error: unknown) => {
	if (error instanceof Error) {
		console.error(error.message);
	} else {
		console.error("不明なエラーが発生しました");
	}

	process.exitCode = 1;
});
