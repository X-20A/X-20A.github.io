/**
 * branch_dataをhtml文字列に変換して返す。サニタイズはしませんよ
 * @param convertedData 
 * @returns 
 */
export function convert_branch_data_to_HTML(data: string, topic: string): string {
    let converted_data = data;
    converted_data = converted_data.replaceAll('$e', '<br>');
    converted_data = converted_data.replaceAll('$i', '&nbsp;&nbsp;&nbsp;&nbsp;');
    converted_data = converted_data.replaceAll('$co', '<span style="color:red;">');
    converted_data = converted_data.replaceAll('$oc', '</span>');
    converted_data = converted_data.replaceAll('$bo', '<span style="font-weight:bold;">');
    converted_data = converted_data.replaceAll('$ob', '</span>');
    converted_data = converted_data.replaceAll('$da', '<span style="color:#4800ff;">第五艦隊</span>');
    converted_data = converted_data.replaceAll('$re', '<span style="color:#e65100;">礼号作戦</span>');
    converted_data = converted_data.replaceAll(
        '$or',
        `<a
			href="https://x-20a.github.io/reference/?topic=${encodeURIComponent(topic)}"
			style="color:blue;"
			target="_blank"
			rel="noopener noreferrer"
		>`,
    );
    converted_data = converted_data.replaceAll('$ro', '</a>');

    return converted_data;
}