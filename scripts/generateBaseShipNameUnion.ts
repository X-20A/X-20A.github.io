import fs from "fs";
import path from "path";

/**
 * Base艦の艦名をSHIP_DATASから抽出してユニオン型を生成する
 * base値が指すベース艦の艦名をすべて抽出
 */
const generate_base_ship_name_union = (): void => {
    const input_file_path = path.resolve(__dirname, "../src/data/ship.ts");
    const output_file_path = path.resolve(
        __dirname,
        "../src/types/baseShipName.ts"
    );

    const file_content = fs.readFileSync(input_file_path, "utf-8");

    // 正規表現で艦IDとnameとbaseを同時に抽出
    // 例: ,1:{name:"睦月",type:...base:1}
    const ship_pattern =
        /(\d+):\{[^}]*name:\s*["']([^"']+)["'][^}]*base:(\d+)/g;
    const matches = [...file_content.matchAll(ship_pattern)];

    // base値をキーに、対応する実際の艦名をマッピング
    // base:Xとは「IDXの艦が基になった艦」という意味
    const base_to_name: Record<string, string> = {};
    matches.forEach((match) => {
        const ship_id = match[1];
        const ship_name = match[2];
        const base_id = match[3];

        // base_idが指す艦（つまり基になった艦）として、ship_nameを記録
        // ペアリング対象: ship_idとbase_idが同じ場合はベース艦、異なる場合は改造艦
        if (ship_id === base_id) {
            base_to_name[base_id] = ship_name;
        }
    });

    // 重複を除去してソート
    const names = Array.from(new Set(Object.values(base_to_name))).sort();

    // ユニオン型を生成
    const type_def = [
        "/**",
        " * Base艦の艦名ユニオン型 (自動生成)",
        " * base値で指定される基になった艦の艦名",
        " * @see ../data/ship.ts",
        " */",
        "export type BaseShipName =",
        names.map((n) => `    | '${n}'`).join("\n"),
        ";",
        "",
    ].join("\n");

    fs.writeFileSync(output_file_path, type_def, "utf-8");

    console.log('型: BaseShipName を自動生成しました');
};

generate_base_ship_name_union();
