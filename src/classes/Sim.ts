import { edges } from "@/data/map";
import CustomError from "./CustomError";
import AdoptFleet from "./AdoptFleet";
import Scanner from "./Scanner";
import { SimResult, BranchInfo, AreaId, OptionsType } from "./types";

/**
 * シミュコントローラ    
 * 走査子を分裂させながらマップに浸透させるイメージ    
 * テストしやすいようにstoreには依存させない    
 * branchを簡潔に書きたいのでなるべくこっちに肩代わりさせる
 */
export default class SimController {
    /**
     * シミュる艦隊
     */
    private fleet: AdoptFleet;

    /**
     * シミュる海域
     */
    private area_id: AreaId;


    private options: OptionsType;

    private clone_count: number = 0;

    constructor(fleet: AdoptFleet, area_id: AreaId, options: OptionsType) {
        this.fleet = fleet;
        this.area_id = area_id;
        this.options = options;
    }

    public start(): SimResult[] {
        const scanners: Scanner[] = [new Scanner([null], null, 1)];
        const results: SimResult[] = [];
        const area_routes = edges[this.area_id];
        let i = 0;
        while (scanners.length > 0) {
            const scanner = scanners.pop()!;

            while (!scanner.is_fin) {
                const next_node = area_routes.filter(item => item[0] === scanner.currentNode);
                if (next_node.length >= 2 || scanner.currentNode === null) {
                    // 分岐
                    const branched_nodes = this.branch(scanner.currentNode, scanner);
                    if (!Array.isArray(branched_nodes)) {
                        scanner.progress(branched_nodes, 1);
                    } else {
                        for (let i = 1; i < branched_nodes.length; i++) {
                            const newScanner = scanner.clone();
                            newScanner.progress(branched_nodes[i].node, branched_nodes[i].rate);
                            scanners.push(newScanner);

                            this.clone_count++;
                            if (this.clone_count >= 100) {
                                throw new CustomError('あー！無限ループ');
                            }
                        }

                        scanner.progress(branched_nodes[0].node, branched_nodes[0].rate);
                    }
                } else if (next_node.length === 1) {
                    // 一本道
                    scanner.progress(next_node[0][1], 1);
                } else {
                    // 終点
                    results.push({
                        route: scanner.route.filter((item) => item !== null), // nullを除外
                        rate: scanner.rate,
                    });
                    scanner.is_fin = true;
                }
            }
            i++;
        }
        return results;
    }

    /**
     * 分岐関数    
     * なるべくコーディング量を抑えたいので慣例から外れたことするかも
     * @param world 
     * @param area 
     * @param node 
     * @returns 
     */
    private branch(node: string | null, scanner: Scanner): BranchInfo[] | string {
        // AdoptFleet展開
        // コーディングを減らしたいだけ 処理コストは変わらないと思う
        const fleet = this.fleet;
        const f_names = fleet.ship_names;
        const f_length = fleet.fleet_length;
        const f_type = fleet.fleet_type;
        const f_speed = fleet.speed;
        const f_seek = fleet.seek;
        const f_drum = fleet.drum_carrier_count;
        const f_radar = fleet.radar_carrier_count;
        const f_radar5 = fleet.radar5_carrier_count;
        const f_craft = fleet.craft_carrier_count;
        const f_arctic = fleet.arctic_gear_carrier_count;

        const track = scanner.route;

        const composition = fleet.composition;
        const BB = composition.BB;
        const BBV = composition.BBV;
        const CV = composition.CV;
        const CVB = composition.CVB;
        const CVL = composition.CVL;
        const CA = composition.CA;
        const CAV = composition.CAV;
        const CL = composition.CL;
        const CLT = composition.CLT;
        const CT = composition.CT;
        const DD = composition.DD;
        const DE = composition.DE;
        const SS = composition.SS;
        const SSV = composition.SSV;
        const AV = composition.AV;
        const AO = composition.AO;
        const LHA = composition.LHA;
        const AS = composition.AS;
        const AR = composition.AR;

        const BBs = BB + BBV; // 戦艦級
        const CVs = CV + CVL + CVB; // 空母系
        const BBCVs = BBs + CVs; // 戦艦級+空母系
        const CAs = CA + CAV; // 重巡級
        const Ds = DD + DE; // 駆逐艦 + 海防艦
        const Ss = SS + SSV; // 潜水艦 + 潜水空母

        const option = this.options[this.area_id];

        switch (this.area_id) {
            case '1-1':
                switch (node) {
                    case null:
                        return '1';
                    case 'A':
                        switch (f_length) {
                            case 1:
                                return [
                                    { node: 'B', rate: 0.2 },
                                    { node: 'C', rate: 0.8 },
                                ];
                            case 2:
                                return [
                                    { node: 'B', rate: 0.25 },
                                    { node: 'C', rate: 0.75 },
                                ];
                            case 3:
                                return [
                                    { node: 'B', rate: 0.3 },
                                    { node: 'C', rate: 0.7 },
                                ];
                            case 4:
                                return [
                                    { node: 'B', rate: 0.35 },
                                    { node: 'C', rate: 0.65 },
                                ];
                            case 5:
                                return [
                                    { node: 'B', rate: 0.4 },
                                    { node: 'C', rate: 0.6 },
                                ];
                            case 6:
                                return [
                                    { node: 'B', rate: 0.55 },
                                    { node: 'C', rate: 0.45 },
                                ];
                        }
                }
                break;
            case '5-5':
                switch (node) {
                    case null:
                        return '1';
                    case '1':
                        if (DD > 3 || f_drum > 3 || f_craft > 3) {
                            return 'A';
                        } else {
                            return 'B';
                        }
                    case 'B':
                        if (CV + CVB > 2 || BBs + CLT > 3 || CLT > 2 || DD < 2) {
                            return 'K';
                        } else {
                            return 'F';
                        }
                    case 'E':
                        if (f_speed === '最速艦隊' || (DD > 1 && f_speed === '高速+艦隊')) {
                            return 'E';
                        } else {
                            return 'E';
                        }
                    case 'F':
                        if (option?.F === 'D') {
                            return 'D';
                        } else {
                            return 'J';
                        }
                    case 'H':
                        if (f_speed === '最速艦隊') {
                            return 'N';
                        } else if (BBCVs > 3) {
                            return 'P';
                        } else if (DD < 2) {
                            return 'L';
                        } else {
                            return 'N';
                        }
                    case 'I':
                        if (BBCVs === 3 && DD > 1) {
                            return 'L';
                        } else {
                            return 'M';
                        }
                    case 'M':
                        if (track.includes('N')) {
                            return 'O';
                        } else if (BBCVs > 3 || DD < 2) {
                            return 'L';
                        } else {
                            return 'O';
                        }
                    case 'N':
                        if (track.includes('M') || fleet.isFaster() || AO > 0) {
                            return 'O';
                        } else if (CV + CVB > 0 || BBs + CVL > 2 || DD < 2) {
                            return 'M';
                        } else {
                            return 'O';
                        }
                    case 'O':
                        if (fleet.isFaster()) {
                            return 'S';
                        } else if (f_seek[1] < 63) {
                            return 'R';
                        } else if ((f_seek[1] < 66 && f_seek[1] >= 63) || Ss > 0) {
                            return [
                                { node: 'S', rate: 0.5 },
                                { node: 'R', rate: 0.5 },
                            ];
                        } else if (f_seek[1] >= 66) {
                            return 'S';
                        } // LoSより例外なし
                        break;
                    case 'P':
                        if (f_speed === '最速艦隊') {
                            return 'S';
                        } else if (f_speed === '高速+艦隊') {
                            if (Ss > 0) {
                                return [
                                    { node: 'Q', rate: 0.5 },
                                    { node: 'S', rate: 0.5 },
                                ];
                            } else if (BBCVs < 6) {
                                return 'S';
                            } else {
                                return [
                                    { node: 'Q', rate: 0.5 },
                                    { node: 'S', rate: 0.5 },
                                ];
                            }
                        } else if (f_seek[1] < 73) {
                            return 'Q';
                        } else if ((f_seek[1] < 80 && f_seek[1] >= 73) || Ss > 0 || BBCVs > 4) {
                            return [
                                { node: 'S', rate: 0.666 },
                                { node: 'Q', rate: 0.334 },
                            ];
                        } else if (f_seek[1] >= 80) {
                            return 'S';
                        } // LoSより例外なし
                        break;
                }
                break;
        }

        throw new CustomError('条件漏れ');
    }
}