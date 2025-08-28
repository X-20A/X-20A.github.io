import fs from "fs";
import path from "path";

const generate_union_type = (
    input_path: string,
    output_path: string,
    extract_pattern: RegExp,
    type_name: string,
): void => {
    const input_file_path = path.resolve(__dirname, input_path);

    const fileContent = fs.readFileSync(input_file_path, "utf-8");

    // 正規表現で値を抽出
    const matches = [...fileContent.matchAll(extract_pattern)];
    const names = Array.from(new Set(matches.map((match) => match[1])));

    // 全て数値なら数値リテラル型、そうでなければ文字列リテラル型
    const isAllNumber = names.every(num => {
        if (!num) throw new Error('正規表現抽出に失敗しました');
        return /^\d+$/.test(num);
    });
    const typeDef = [
        '/**',
        ` * ${type_name}ユニオン型 (自動生成)`,
        ` * @see ${input_path.replace(/^(\.\.\/)+/, '')}`,
        ' */',
        `export type ${type_name} =`,
        names.map((n) => isAllNumber
            ? `    | ${n}`
            : `    | '${n}'`).join("\n"),
        ';',
        ''
    ].join('\n');

    fs.writeFileSync(
        path.resolve(__dirname, output_path),
        typeDef,
        "utf-8"
    );

    console.log(`型: ${type_name} を自動生成しました`);
}

// 艦ID
generate_union_type(
    '../src/data/ship.ts',
    '../src/types/shipId.ts',
    /(?:^|,)\s*(\d+)\s*:\s*\{/gm,
    'ShipId',
);

// 艦名
generate_union_type(
    '../src/data/ship.ts',
    '../src/types/shipName.ts',
    /name:\s*["']([^"']+)["']/g,
    'ShipName',
);

// 装備ID
generate_union_type(
    '../src/data/equip.ts',
    '../src/types/equipId.ts',
    /(\d+):/g,
    'EquipId',
);

// 装備名
generate_union_type(
    '../src/data/equip.ts',
    '../src/types/equipName.ts',
    /\]\s*\/\/\s*([^\n\r]+)/g,
    'EquipName',
);