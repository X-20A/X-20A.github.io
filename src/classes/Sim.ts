import { edges } from "@/data/map";
import CustomError from "./CustomError";
import AdoptFleet from "./AdoptFleet";
import Scanner from "./Scanner";
import { SimResult, BranchResponse, AreaId, OptionsType } from "./types";

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
    /**
     * 能動分岐、Phase、難易度
     */
    private option: Record<string, string>;
    /**
     * Scannerが分裂した回数
     */
    private clone_count: number = 0;
    /**
     * Scannerの分裂の最大許容数(無限ループ防止)    
     * 毎回routeをfindとかしてチェックするよりたぶん速い。基本起こらないし
     */
    private readonly MAX_CLONE_COUNT: number = 15;

    constructor(fleet: AdoptFleet, area_id: AreaId, options: OptionsType) {
        this.fleet = fleet;
        this.area_id = area_id;
        this.option = options[area_id]!;
    }

    /**
     * シミュ開始    
     * 処理的にはコンストラクタから一続き
     * @returns 
     */
    public start(): SimResult[] {
        // NOTE: 一本道と終点について、予めMapとSetを用意するのを試したが、遅くなったので没
        // 非同期処理で、 0.6ms - 60ms
        // 同期処理で 24ms - 28ms 😢
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
                            if (this.clone_count >= this.MAX_CLONE_COUNT) {
                                throw new CustomError('あー！無限ループ！');
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
    private branch(node: string | null, scanner: Scanner): BranchResponse[] | string {
        // AdoptFleet展開
        // コーディングを減らしたいだけ 処理コストは変わらないと思う
        const fleet = this.fleet;
        // const f_names = fleet.ship_names; // AdoptFleet.isIncludeがあるからいらない？
        const f_length = fleet.fleet_length;
        const f_type = fleet.fleet_type;
        const f_speed = fleet.speed;
        const f_seek = fleet.seek;
        const f_drum = fleet.drum_carrier_count;
        const f_radar = fleet.radar_carrier_count;
        // const f_radar5 = fleet.radar5_carrier_count; // 索敵5以上の電探を装備した艦の数
        const f_craft = fleet.craft_carrier_count;

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
        // const AR = composition.AR; // 工作艦

        const BBs = BB + BBV; // 戦艦級
        const CVs = CV + CVL + CVB; // 空母系
        const BBCVs = BBs + CVs; // 戦艦級+空母系
        const CAs = CA + CAV; // 重巡級
        const Ds = DD + DE; // 駆逐艦 + 海防艦
        const Ss = SS + SSV; // 潜水艦 + 潜水空母

        const option = this.option;

        switch (this.area_id) {
            case '1-1':
                switch (node) {
                    case null:
                        return '1';
                    case 'A':
                        if (f_length === 1) {
                            return [
                                { node: 'B', rate: 0.2 },
                                { node: 'C', rate: 0.8 },
                            ];
                        } else if (f_length === 2) {
                            return [
                                { node: 'B', rate: 0.25 },
                                { node: 'C', rate: 0.75 },
                            ];
                        } else if (f_length === 3) {
                            return [
                                { node: 'B', rate: 0.3 },
                                { node: 'C', rate: 0.7 },
                            ];
                        } else if (f_length === 4) {
                            return [
                                { node: 'B', rate: 0.35 },
                                { node: 'C', rate: 0.65 },
                            ];
                        } else if (f_length === 5) {
                            return [
                                { node: 'B', rate: 0.4 },
                                { node: 'C', rate: 0.6 },
                            ];
                        } else if (f_length >= 6) {
                            return [
                                { node: 'B', rate: 0.55 },
                                { node: 'C', rate: 0.45 },
                            ];
                        }
                }
                break;
            case '1-2':
                switch (node) {
                    case null:
                        return '1';
                    case '1':
                        if (Ds === 4 && f_length < 6) {
                            return 'A';
                        }  else {
                            if (f_length > 5) {
                                return [
                                    { node: 'A', rate: 0.4 },
                                    { node: 'B', rate: 0.6 },
                                ];
                            } else if (f_length === 5) {
                                return [
                                    { node: 'A', rate: 0.5 },
                                    { node: 'B', rate: 0.5 },
                                ];
                            } else if (f_length === 4) {
                                return [
                                    { node: 'A', rate: 0.6 },
                                    { node: 'B', rate: 0.4 },
                                ];
                            } else { // f_length < 4
                                return [
                                    { node: 'A', rate: 0.7 },
                                    { node: 'B', rate: 0.3 },
                                ];
                            }
                        }
                        break;
                    case 'A':
                        if (f_speed !== '低速艦隊') {
                            return 'E';
                        } else if (Ds < 4) {
                            return 'D';
                        } else if (Ds === 6) {
                            return 'E';
                        } else if (CL + CT === 1 && Ds === 5) {
                            return 'E';
                        } else if (CL === 1 && Ds > 3) {
                            return 'E';
                        } else {
                            return [
                                { node: 'D', rate: 0.35 },
                                { node: 'E', rate: 0.65 },
                            ];
                        }
                }
                break;
            case '1-3':
                switch (node) {
                    case null:
                        return '1';
                    break;
                    case '1':
                        if (AO + AV > 0) {
                            return 'A';
                        } else if (CVs > 0) {
                            return 'C';
                        } else {
                            return [
                                { node: 'A', rate: 0.5 },
                                { node: 'C', rate: 0.5 },
                            ];
                        }
                        break;
                    case 'A':
                        if (AO > 0) {
                            return 'D';
                        } else if (DE > 3) {
                            return 'D';
                        } else if (AV > 0 || Ds > 3) {
                            return [
                                { node: 'D', rate: 0.8 },
                                { node: 'E', rate: 0.2 },
                            ];
                        } else if (Ss > 0) {
                            return 'E';
                        } else {
                            return [
                                { node: 'D', rate: 0.5 },
                                { node: 'E', rate: 0.5 },
                            ];
                        }
                        break;
                    case 'F':
                        if (CV + CVB > 0) {
                            return 'H';
                        } else if (fleet.countSBB() > 0) {
                            return 'H';
                        } else if (CAV > 0 && DD > 1) {
                            return 'J';
                        } else if (DD > 3) {
                            return 'J';
                        } else if (CL + CT > 0 && Ds > 3) {
                            return 'J';
                        } else if (f_speed !== '低速艦隊') {
                            return [
                                { node: 'H', rate: 0.4 },
                                { node: 'J', rate: 0.6 },
                            ];
                        } else {
                            return [
                                { node: 'H', rate: 0.6 },
                                { node: 'J', rate: 0.4 },
                            ];
                        }
                        break;
                    case 'H':
                        if (AO > 0) {
                            return 'G';
                        } else if (AV + CAV > 0) {
                            return 'J';
                        } else if (CL + CT > 0 && DD > 1) {
                            return 'J';
                        } else if (DD > 1) {
                            return [
                                { node: 'G', rate: 0.4 },
                                { node: 'I', rate: 0.2 },
                                { node: 'J', rate: 0.4 },
                            ];
                        } else {
                            return [
                                { node: 'I', rate: 0.6 },
                                { node: 'J', rate: 0.4 },
                            ];
                        }
                        break;
                }
                break;
            case '1-4':
                switch (node) {
                    case null:
                        return '1';
                    case '1':
                        return [
                            { node: 'A', rate: 0.5 },
                            { node: 'B', rate: 0.5 },
                        ];
                    case 'B':
                        if (CVs > 2 || BBs > 2 || Ds === 0) {
                            return 'D';
                        } else if (Ds > 2) {
                            return 'C';
                        } else if (CL > 0) {
                            return [
                                { node: 'C', rate: 0.8 },
                                { node: 'D', rate: 0.2 },
                            ];
                        } else {
                            return [
                                { node: 'C', rate: 0.6 },
                                { node: 'D', rate: 0.4 },
                            ];
                        }
                        break;
                    case 'D':
                        if (AS > 0) {
                            return 'E';
                        } else if (AV > 0) {
                            return 'G';
                        } else {
                            return [
                                { node: 'E', rate: 0.5 },
                                { node: 'G', rate: 0.5 },
                            ];
                        }
                        break;
                    case 'F':
                        if (Ds > 3) {
                            return 'E';
                        } else if (Ds > 1) {
                            if (AV + AS + AO > 0 || BBV === 2) {
                                return 'E';
                            } else if (Ds === 3) {
                                return [
                                    { node: 'E', rate: 0.8 },
                                    { node: 'H', rate: 0.2 },
                                ];
                            } else if (Ds === 2) {
                                return [
                                    { node: 'E', rate: 0.6 },
                                    { node: 'H', rate: 0.4 },
                                ];
                            } // Dsより例外なし
                        } else {
                            return [
                                { node: 'H', rate: 0.5 },
                                { node: 'I', rate: 0.5 },
                            ];
                        }
                        break;
                    case 'J':
                        if (CL > 0 && AV > 0 && Ds > 1) {
                            return 'L';
                        } else if (DD > 3) {
                            return 'L';
                        } else if (DD > 1) {
                            return [
                                { node: 'K', rate: 0.25 },
                                { node: 'L', rate: 0.75 },
                            ];
                        } else {
                            return [
                                { node: 'K', rate: 0.35 },
                                { node: 'L', rate: 0.65 },
                            ];
                        }
                        break;
                }
                break;
            case '1-5':
                switch (node) {
                    case null:
                        return 'A';
                    case 'D':
                        if (f_length === 1) {
                            return 'E';
                        } else if (f_length > 4) {
                            if (Ss > 0) {
                                return 'F';
                            } else {
                                return [
                                    { node: 'E', rate: 0.5 },
                                    { node: 'F', rate: 0.5 },
                                ];
                            }
                        } else if (DE === f_length) {
                            return 'E';
                        } else if (AO > 0) {
                            return 'E';
                        } else {
                            return 'F';
                        }
                        break;
                    case 'E':
                        if (f_length > 4) {
                            return 'C';
                        } else if (f_length === DE) {
                            return 'J';
                        } else {
                            return 'C';
                        }
                        break;
                    case 'C':
                        if (f_length === DE) {
                            return 'J';
                        } else if (CL === 1 && DE === 4 && f_length === 5) {
                            return 'J';
                        } else if (f_length < 5 && AO > 0) {
                            return [
                                { node: 'B', rate: 0.5 },
                                { node: 'J', rate: 0.5 },
                            ];
                        } else {
                            return 'B';
                        }
                        break;
                    case 'F':
                        if (BB + CV + CVB + Ss > 0) {
                            return 'I';
                        } else if (CVL > 1) {
                            return 'I';
                        } else if (CL > 2) {
                            return 'I';
                        } else {
                            return 'G';
                        }
                        break;
                    case 'G':
                        if (f_length > 4) {
                            return 'H';
                        } else {
                            return 'J';
                        }
                        break;
                }
                break;
            case '1-6':
                switch (node) {
                    case null:
                        return '1';
                    case '1':
                        if (BBV + CVL + CA > 0) {
                            return 'C';
                        } else if (CAV > 1) {
                            return 'C';
                        } else if (Ds < 4) {
                            return 'C';
                        } else {
                            return 'A';
                        }
                        break;
                    case 'G':
                        if (CL === 1 && Ds === 5) {
                            return 'F';
                        } else {
                            return [
                                { node: 'F', rate: 0.75 },
                                { node: 'K', rate: 0.25 },
                            ];
                        }
                        break;
                    case 'M':
                        if (BBV + CA + CVL > 2) {
                            return 'L';
                        } else if (BBV + CAs > 2) {
                            return 'L';
                        } else if (Ds < 3) {
                            return 'L';
                        } else if (f_seek[2] < 28) {
                            return 'L';
                        } else if (f_seek[2] < 30 && f_seek[2] >= 28) {
                            return [
                                { node: 'J', rate: 0.5 },
                                { node: 'L', rate: 0.5 },
                            ];
                        } else { // f_seek[2] >= 30
                            return 'J';
                        }
                }
                break;
            case '2-1':
                switch (node) {
                    case null:
                        return '1';
                    case 'C':
                        if (CVs > 2 || BBV > 1) {
                            return 'B';
                        } else if (AO > 0 && Ss === 0) {
                            return 'B';
                        } else if (BBV > 0) {
                            if (AV + AS > 0) {
                                return [
                                    { node: 'B', rate: 0.7 },
                                    { node: 'E', rate: 0.3 },
                                ];
                            } else {
                                return [
                                    { node: 'B', rate: 0.7 },
                                    { node: 'D', rate: 0.3 },
                                ];
                            }
                        } else if (AV + AS > 0) {
                            return 'E';
                        } else {
                            return [
                                { node: 'D', rate: 0.5 },
                                { node: 'E', rate: 0.5 },
                            ];
                        }
                        break;
                    case 'E':
                        if (BBCVs > 4) {
                            return 'F';
                        } else if (f_length > 5) {
                            if (BBCVs > 0) {
                                return 'D';
                            } else if (Ds === 6) {
                                return 'H';
                            } else if (CL === 1 && Ds === 5) {
                                return 'H';
                            } else if (f_speed !== '低速艦隊' && CL === 1 && DD === 4) {
                                return 'H';
                            } else {
                                return 'D';
                            }
                        } else { // f_length <= 5
                            if (Ds === 5) {
                                return 'H';
                            } else if (CL === 1 && Ds === 4) {
                                return 'H';
                            } else if (f_speed !== '低速艦隊' && CL === 1 && DD === 3) {
                                return 'H';
                            } else {
                                return [
                                    { node: 'D', rate: 0.6 },
                                    { node: 'F', rate: 0.4 },
                                ];
                            }
                        }
                        break;
                    case 'F':
                        if (BBCVs > 4) {
                            return 'G';
                        } else if (DD > 2) {
                            return 'H';
                        } else if (CL > 0 && DD > 1) {
                            return 'H';
                        } else {
                            return [
                                { node: 'G', rate: 0.6 },
                                { node: 'H', rate: 0.4 },
                            ];
                        }
                        break;
                }
                break;
            case '2-2':
                switch (node) {
                    case null:
                        return '1';
                    case 'C':
                        if (CVs > 2 || BBV > 1) {
                            return 'B';
                        } else if (AO > 0 && Ss === 0) {
                            return 'B';
                        } else if (BBV > 0) {
                            if (AV + AS > 0) {
                                return [
                                    { node: 'B', rate: 0.7 },
                                    { node: 'E', rate: 0.3 },
                                ];
                            } else {
                                return [
                                    { node: 'B', rate: 0.7 },
                                    { node: 'D', rate: 0.3 },
                                ];
                            }
                        } else if (AV + AS > 0) {
                            return 'E';
                        } else {
                            return [
                                { node: 'D', rate: 0.5 },
                                { node: 'E', rate: 0.5 },
                            ];
                        }
                        break;
                    case 'E':
                        if (BBCVs > 3) {
                            return 'G';
                        } else if (DE > 1) {
                            return 'F';
                        } else if (BBCVs === 3) {
                            return [
                                { node: 'G', rate: 0.7 },
                                { node: 'K', rate: 0.3 },
                            ];
                        } else if (BBCVs === 2) {
                            return [
                                { node: 'G', rate: 0.5 },
                                { node: 'K', rate: 0.5 },
                            ];
                        } else if (BBCVs === 1) {
                            return [
                                { node: 'G', rate: 0.3 },
                                { node: 'K', rate: 0.7 },
                            ];
                        } else if (Ds > 2 && AS > 0) {
                            return 'F';
                        } else if (Ds > 1) {
                            if (CL > 0 && f_speed !== '低速艦隊') {
                                return 'K';
                            } else {
                                return [
                                    { node: 'F', rate: 0.3 },
                                    { node: 'K', rate: 0.7 },
                                ];
                            }
                        } else {
                            return [
                                { node: 'G', rate: 0.5 },
                                { node: 'K', rate: 0.5 },
                            ];
                        }
                        break;
                    case 'G':
                        if (CVs > 0 || DD === 0) {
                            return 'H';
                        } else {
                            return [
                                { node: 'H', rate: 0.5 },
                                { node: 'K', rate: 0.5 },
                            ];
                        }
                        break;
                    case 'H':
                        if (BBCVs > 3) {
                            return [
                                { node: 'I', rate: 0.7 },
                                { node: 'K', rate: 0.3 },
                            ];
                        } else if (CVs + CAV + AV > 0) {
                            return 'K';
                        } else if (Ss > 0) {
                            return [
                                { node: 'I', rate: 0.7 },
                                { node: 'K', rate: 0.3 },
                            ];
                        } else if (Ds > 1) {
                            return [
                                { node: 'J', rate: 0.5 },
                                { node: 'K', rate: 0.5 },
                            ];
                        } else if (Ds === 1) {
                            return [
                                { node: 'I', rate: 0.333 },
                                { node: 'J', rate: 0.333 },
                                { node: 'K', rate: 0.334 },
                            ];
                        } else {
                            return [
                                { node: 'I', rate: 0.5 },
                                { node: 'K', rate: 0.5 },
                            ];
                        }
                        break;
                }
                break;
            case '2-3':
                switch (node) {
                    case null:
                        return '1';
                    case '1':
                        if (Ss + AS === f_length) {
                            return 'C';
                        } else {
                            return [
                                { node: 'A', rate: 0.5 },
                                { node: 'B', rate: 0.5 },
                            ];
                        }
                        break;
                    case 'C':
                        return [
                            { node: 'D', rate: 0.6 },
                            { node: 'F', rate: 0.4 },
                        ];
                    case 'D':
                        if (AV + AO > 0 && Ds > 1) {
                            return 'G';
                        } else if (Ss > 1 && AS > 0) {
                            return 'G';
                        } else if (Ss === f_length) {
                            return [
                                { node: 'F', rate: 0.35 },
                                { node: 'G', rate: 0.65 },
                            ];
                        } else if (Ss > 0 && BBCVs > 0) {
                            return [
                                { node: 'F', rate: 0.65 },
                                { node: 'G', rate: 0.35 },
                            ];
                        } else {
                            if (Ds > 3) {
                                return [
                                    { node: 'F', rate: 0.25 },
                                    { node: 'G', rate: 0.75 },
                                ];
                            } else if (Ds === 3) {
                                return [
                                    { node: 'F', rate: 0.35 },
                                    { node: 'G', rate: 0.65 },
                                ];
                            } else if (Ds === 2) {
                                return [
                                    { node: 'F', rate: 0.5 },
                                    { node: 'G', rate: 0.5 },
                                ];
                            } else {
                                return [
                                    { node: 'F', rate: 0.65 },
                                    { node: 'G', rate: 0.35 },
                                ];
                            }
                        }
                        break;
                    case 'F':
                        if (CVs + CL + AV > 0) {
                            return [
                                { node: 'G', rate: 0.1 },
                                { node: 'J', rate: 0.9 },
                            ];
                        } else if (Ss > 1 && AS > 0) {
                            return [
                                { node: 'G', rate: 0.8 },
                                { node: 'J', rate: 0.2 },
                            ];
                        } else {
                            return [
                                { node: 'G', rate: 0.25 },
                                { node: 'H', rate: 0.35 },
                                { node: 'J', rate: 0.40 },
                            ];
                        }
                        break;
                    case 'G':
                        if (Ss > 1 && AS > 0) {
                            return [
                                { node: 'I', rate: 0.6 },
                                { node: 'K', rate: 0.4 },
                            ];
                        } else if (Ss === f_length) {
                            return [
                                { node: 'I', rate: 0.55 },
                                { node: 'K', rate: 0.45 },
                            ];
                        } else if (CL + Ds < 2) {
                            return 'K';
                        } else if (AV + AO > 0 && Ds > 1) {
                            return [
                                { node: 'I', rate: 0.65 },
                                { node: 'K', rate: 0.35 },
                            ];
                        } else if (Ds > 2) {
                            return [
                                { node: 'I', rate: 0.45 },
                                { node: 'K', rate: 0.55 },
                            ];
                        } else if (Ds > 0) {
                            return [
                                { node: 'I', rate: 0.35 },
                                { node: 'K', rate: 0.65 },
                            ];
                        } else if (Ds === 0) {
                            return 'K';
                        }
                        break;
                    case 'J':
                        if (CL > 0 && DD > 3) {
                            return 'N';
                        } else if (CL === 1 && CA === 5) {
                            return 'N';
                        } else if (Ss === f_length) {
                            return [
                                { node: 'M', rate: 0.1 },
                                { node: 'N', rate: 0.9 },
                            ];
                        } else if (Ss > 0) {
                            return [
                                { node: 'L', rate: 0.45 },
                                { node: 'M', rate: 0.1 },
                                { node: 'N', rate: 0.45 },
                            ];
                        } else if (BBCVs === 6) {
                            return 'L';
                        } else if (BBCVs === 5) {
                            return [
                                { node: 'L', rate: 0.85 },
                                { node: 'N', rate: 0.15 },
                            ];
                        } else if (BBCVs === 4) {
                            return [
                                { node: 'L', rate: 0.25 },
                                { node: 'N', rate: 0.75 },
                            ];
                        } else if (BBCVs === 3) {
                            return [
                                { node: 'L', rate: 0.2 },
                                { node: 'N', rate: 0.8 },
                            ];
                        } else if (BBCVs < 3) {
                            return [
                                { node: 'L', rate: 0.1 },
                                { node: 'N', rate: 0.9 },
                            ];
                        }
                        break;
                }
                break;
            case '2-4':
                switch (node) {
                    case null:
                        return '1';
                    case 'B':
                        if (DD === 6) {
                            return 'G';
                        } else if (CL + CT === 1 && DD > 3 && (CAs === 1 || DD === 5 || DE === 1)) {
                            // 条件式への変換が難しい。合ってると思うけど
                            return 'G';
                        } else if (Ds < 3) {
                            if (CVs > 2) {
                                return 'C';
                            } else if (BBs + CV + CVB > 2) {
                                return 'C';
                            } else if (BBs + CV + CVB === 2) {
                                return [
                                    { node: 'C', rate: 0.8 },
                                    { node: 'G', rate: 0.2 },
                                ];
                            } else if (CV + CVB > 0) {
                                return [
                                    { node: 'C', rate: 0.6 },
                                    { node: 'G', rate: 0.4 },
                                ];
                            } else if (Ss > 0) {
                                return [
                                    { node: 'C', rate: 0.6 },
                                    { node: 'G', rate: 0.4 },
                                ];
                            } else { // 保険
                                return [
                                    { node: 'C', rate: 0.4 },
                                    { node: 'G', rate: 0.6 },
                                ];
                            }
                        } else {
                            return [
                                { node: 'C', rate: 0.4 },
                                { node: 'G', rate: 0.6 },
                            ];
                        }
                        break;
                    case 'C':
                        if (AS + AO > 0) {
                            return 'G';
                        } else {
                            return [
                                { node: 'F', rate: 0.5 },
                                { node: 'G', rate: 0.5 },
                            ];
                        }
                        break;
                    case 'F':
                        if (CVL > 0 && Ds > 1) {
                            return [
                                { node: 'A', rate: 7.5 },
                                { node: 'J', rate: 92.5 },
                            ];
                        } else if (CVL > 0) {
                            return [
                                { node: 'A', rate: 0.175 },
                                { node: 'J', rate: 0.825 },
                            ];
                        } else if (DD > 1) {
                            return [
                                { node: 'A', rate: 0.25 },
                                { node: 'J', rate: 0.75 },
                            ];
                        } else if (DD < 2) {
                            return 'A';
                        } // DDより例外なし
                        break;
                    case 'H':
                        if (CL + CT > 0 && DD > 3 && (CAs === 1 || CL + CT === 2 || DD === 5)) {
                            // 条件式変換が難しい
                            return 'L';
                        } else {
                            return 'I';
                        }
                        break;
                    case 'I':
                        if (CVL > 0 && CL > 0) {
                            return [
                                { node: 'E', rate: 0.075 },
                                { node: 'K', rate: 0.925 },
                            ];
                        } else if (CVL > 0) {
                            return [
                                { node: 'E', rate: 0.175 },
                                { node: 'K', rate: 0.825 },
                            ];
                        } else if (CL > 0) {
                            return [
                                { node: 'E', rate: 0.25 },
                                { node: 'K', rate: 0.75 },
                            ];
                        } else {
                            return [
                                { node: 'E', rate: 0.7 },
                                { node: 'K', rate: 0.3 },
                            ];
                        }
                        break;
                    case 'J':
                        if (BBCVs > 3) {
                            return 'L';
                        } else if (BBCVs === 3 || CV + CVB === 2) {
                            return 'M';
                        } else if (CV + CVB === 0) {
                            return 'L';
                        } else {
                            return [
                                { node: 'L', rate: 0.35 },
                                { node: 'M', rate: 0.65 },
                            ];
                        }
                        break;
                    case 'K':
                        if (AS + AO > 1) {
                            return 'N';
                        } else if (AV + AS + AO > 0) {
                            if (Ds > 1) {
                                return [
                                    { node: 'L', rate: 0.7 },
                                    { node: 'N', rate: 0.3 },
                                ];
                            } else if (Ds === 1) {
                                return [
                                    { node: 'L', rate: 0.4 },
                                    { node: 'N', rate: 0.4 },
                                    { node: 'O', rate: 0.2 },
                                ];
                            } else if (Ds === 0) {
                                return [
                                    { node: 'L', rate: 0.25 },
                                    { node: 'N', rate: 0.35 },
                                    { node: 'O', rate: 0.4 },
                                ];
                            }
                        } else if (DE > 1) {
                            return [
                                { node: 'L', rate: 0.65 },
                                { node: 'N', rate: 0.35 },
                            ];
                        } else if (Ds > 1) {
                            return 'L';
                        } else if (Ds === 1) {
                            return [
                                { node: 'L', rate: 0.65 },
                                { node: 'O', rate: 0.35 },
                            ];
                        } else if (CAV > 0) {
                            if (BB > 0) {
                                return [
                                    { node: 'L', rate: 0.35 },
                                    { node: 'O', rate: 0.65 },
                                ];
                            } else {
                                return [
                                    { node: 'L', rate: 0.65 },
                                    { node: 'O', rate: 0.35 },
                                ];
                            }
                        } else if (BB > 0) {
                            return [
                                { node: 'L', rate: 0.225 },
                                { node: 'O', rate: 0.775 },
                            ];
                        } else {
                            return [
                                { node: 'L', rate: 0.35 },
                                { node: 'O', rate: 0.65 },
                            ];
                        }
                        break;
                    case 'L':
                        if (BBCVs === 4) {
                            return 'M';
                        } else if (CL > 0 && DD > 1) {
                            return 'P';
                        } else if (BBs + CV + CVB < 3) {
                            return 'P';
                        } else {
                            return [
                                { node: 'M', rate: 0.6 },
                                { node: 'P', rate: 0.4 },
                            ];
                        }
                        break;
                }
                break;
            case '2-5':
                switch (node) {
                    case null:
                        return '1';
                    case '1':
                        if (Ss > 3) {
                            return 'B';
                        } else if (Ss > 0 && BBs < 4 && (CVs > 0 || AV > 1)) {
                            return [
                                { node: 'B', rate: 0.5 },
                                { node: 'C', rate: 0.5 },
                            ];
                        } else if (CVs > 0 || AV > 1) {
                            return 'C';
                        } else if (f_drum > 1 || Ds > 3) {
                            return 'B';
                        } else if (CL > 0 && Ds > 2) {
                            return 'B';
                        } else if (BBs > 0) {
                            return 'C';
                        } else if (CL + CLT > 0 && CAV > 1) {
                            return 'C';
                        } else if (CL + CLT > 0 && CAV > 0 && CAV + CL + CLT > 4) {
                            return 'C';
                        } else if (f_length === 6) {
                            return [
                                { node: 'B', rate: 0.8 },
                                { node: 'C', rate: 0.2 },
                            ];
                        } else {
                            return [
                                { node: 'B', rate: 0.05 },
                                { node: 'C', rate: 0.95 },
                            ];
                        }
                        break;
                    case 'B':
                        if (Ss > 2) {
                            return 'A';
                        } else {
                            return 'F';
                        }
                        break;
                    case 'C':
                        if (CVs > 2 || BBs > 2) {
                            return 'D';
                        } else if (CL > 0 && DD > 1) {
                            return 'E';
                        } else if (CAV > 1 && DD > 1) {
                            return 'E';
                        } else {
                            return [
                                { node: 'D', rate: 0.3 },
                                { node: 'E', rate: 0.7 },
                            ];
                        }
                        break;
                    case 'E':
                        if (BBs > 0) {
                            return 'G';
                        } else if (CL > 0 && Ds > 3) {
                            return 'I';
                        } else if (f_speed === '低速艦隊') {
                            return 'G';
                        } else if (CV + CVB + CAs > 1) {
                            return 'G';
                        } else if (CL > 0 && DD > 2) {
                            return 'I';
                        } else {
                            return 'G';
                        }
                        break;
                    case 'F':
                        if (f_speed === '低速艦隊') {
                            return 'J';
                        } else if (DD > 2) {
                            return 'E';
                        } else if (CL > 0 && DD > 1) {
                            return 'E';
                        } else {
                            return [
                                { node: 'E', rate: 0.35 },
                                { node: 'J', rate: 0.65 },
                            ];
                        }
                        break;
                    case 'G':
                        if (BBCVs < 2 && Ds > 3) {
                            return 'I';
                        } else if (BBCVs === 0 && CL > 0 && DD > 2) {
                            return 'I';
                        } else if (f_seek[0] < 37) {
                            return 'K';
                        } else if (f_seek[0] < 41 && f_seek[0] >= 37) {
                            return [
                                { node: 'K', rate: 0.5 },
                                { node: 'L', rate: 0.5 },
                            ];
                        } else { // f_seek[0] >= 41
                            return 'L';
                        }
                        break;
                    case 'I':
                        if (f_seek[0] < 31) {
                            return 'H';
                        } else if (f_seek[0] < 34 && f_seek[0] >= 31) {
                            return [
                                { node: 'H', rate: 0.5 },
                                { node: 'O', rate: 0.5 },
                            ];
                        } else { // f_seek[0] >= 31
                            return 'O';
                        }
                        break;
                    case 'J':
                        if (f_seek[0] < 42) {
                            return 'H';
                        } else if (f_seek[0] < 49 && f_seek[0] >= 42) {
                            if (BBCVs > 3) {
                                return [
                                    { node: 'H', rate: 0.333 },
                                    { node: 'M', rate: 0.333 },
                                    { node: 'O', rate: 0.334 },
                                ];
                            } else {
                                return [
                                    { node: 'M', rate: 0.5 },
                                    { node: 'O', rate: 0.5 },
                                ];
                            }
                        } else if (BBCVs > 3) {
                            return [
                                { node: 'M', rate: 0.5 },
                                { node: 'O', rate: 0.5 },
                            ];
                        } else if (f_seek[0] >= 49) {
                            return 'O';
                        } // 索敵値より例外なし
                        break;
                    case 'L':
                        if (CL > 0 && DD > 1) {
                            return 'O';
                        } else if (BBCVs === 0) {
                            return [
                                { node: 'N', rate: 0.4 },
                                { node: 'O', rate: 0.6 },
                            ];
                        } else {
                            return [
                                { node: 'N', rate: 0.6 },
                                { node: 'O', rate: 0.4 },
                            ];
                        }
                        break;
                }
                break;
            case '3-1':
                switch (node) {
                    case null:
                        return '1';
                    case 'C':
                        if (Ds < 2) {
                            return 'D';
                        } else if (BBV + CL + AV + AO > 2) {
                            if (BBCVs > 2) {
                                return [
                                    { node: 'B', rate: 0.5 },
                                    { node: 'D', rate: 0.5 },
                                ];
                            } else {
                                return [
                                    { node: 'B', rate: 0.5 },
                                    { node: 'F', rate: 0.5 },
                                ];
                            }
                        } else if (AV + AO > 0 && Ds > 2) {
                            return [
                                { node: 'B', rate: 0.5 },
                                { node: 'F', rate: 0.5 },
                            ];
                        } else if (Ss > 2) {
                            return [
                                { node: 'D', rate: 0.5 },
                                { node: 'F', rate: 0.5 },
                            ];
                        } else if (BBCVs > 2) {
                            return 'D';
                        } else {
                            return 'F';
                        }
                        break;
                    case 'D':
                        if (BBCVs > 4 || Ss === 6) {
                            return 'E';
                        } else if (AS === 1 && Ss === 5) {
                            return 'G';
                        } else {
                            return 'F';
                        }
                        break;
                }
                break;
            case '3-2':
                switch (node) {
                    case null:
                        return '1';
                    case '1':
                        if (BBCVs > 0) {
                            return 'C';
                        } else if (CL === 1 && DD > 3) {
                            return 'C';
                        } else if (DD === 6) {
                            return 'C';
                        } else {
                            return 'A';
                        }
                        break;
                    case 'C':
                        if (DD < 4 || BBs + CV + CVB > 1) {
                            return 'A';
                        } else if (Ss > 0) {
                            return [
                                { node: 'A', rate: 0.5 },
                                { node: 'G', rate: 0.5 },
                            ];
                        } else if (f_speed === '低速艦隊' || f_radar === 0 || CL + DD + AO < 6) {
                            return 'G';
                        } else if (f_speed === '最速艦隊' && f_radar > 3) {
                            return 'E';
                        } else if (fleet.isFaster() || AO > 0) {
                            return [
                                { node: 'E', rate: 0.4 },
                                { node: 'G', rate: 0.6 },
                            ];
                        } else {
                            return 'G';
                        }
                        break;
                    case 'E':
                        if (fleet.isFaster()) {
                            return 'F';
                        } else {
                            return [
                                { node: 'D', rate: 0.2 },
                                { node: 'F', rate: 0.8 },
                            ];
                        }
                        break;
                    case 'G':
                        if (Ss > 0 || CV + CVB > 0 || BBs + CVL === 2) {
                            return 'J';
                        } else if (f_speed === '低速艦隊' || f_radar === 0 || CL + DD + AO < 6) {
                            return 'H';
                        } else if (fleet.isFaster()) {
                            return 'F';
                        } else if (AO > 0) {
                            return [
                                { node: 'F', rate: 0.55 },
                                { node: 'H', rate: 0.45 },
                            ];
                        } else {
                            return [
                                { node: 'F', rate: 0.35 },
                                { node: 'H', rate: 0.65 },
                            ];
                        }
                        break;
                    case 'H':
                        if (CL + DD + AO === 6) {
                            return 'F';
                        } else {
                            return 'I';
                        }
                        break;
                }
                break;
            case '3-3':
                switch (node) {
                    case null:
                        return '1';
                    case 'A':
                        if (CV + CVB > 0 || BBs + CVL > 3) {
                            return 'C';
                        } else if (BBs + CVL === 1 && CL === 1 && DD === 4) {
                            return 'C';
                        } else {
                            return 'B';
                        }
                        break;
                    case 'B':
                        if (Ss > 0) {
                            return [
                                { node: 'D', rate: 0.5 },
                                { node: 'F', rate: 0.5 },
                            ];
                        } else if (BBs + CVL < 2) {
                            return 'F';
                        } else if (BBs + CVL < 3 && DD > 1) {
                            return 'F';
                        } else {
                            return [
                                { node: 'D', rate: 0.5 },
                                { node: 'F', rate: 0.5 },
                            ];
                        }
                        break;
                    case 'C':
                        if (Ds < 2 || CV + CVB > 1 || BBCVs > 2) {
                            return 'E';
                        } else if (BBCVs === 2) {
                            return 'G';
                        } else if (BBCVs === 1 && CL === 1 && DD === 4) {
                            return 'G';
                        } else {
                            return 'E';
                        }
                        break;
                    case 'F':
                        if (DD < 2 || BBs > 2) {
                            return 'G';
                        } else if (Ss > 0) {
                            return [
                                { node: 'H', rate: 0.5 },
                                { node: 'J', rate: 0.5 },
                            ];
                        } else if (CL + CAV + AV > 0) {
                            return 'J';
                        } else {
                            return [
                                { node: 'H', rate: 0.5 },
                                { node: 'J', rate: 0.5 },
                            ];
                        }
                        break;
                    case 'G':
                        if (Ss > 0) {
                            return [
                                { node: 'I', rate: 0.5 },
                                { node: 'M', rate: 0.5 },
                            ];
                        } else if (BBCVs < 4) {
                            return 'M';
                        } else if (BBCVs === 4) {
                            return [
                                { node: 'I', rate: 0.5 },
                                { node: 'M', rate: 0.5 },
                            ];
                        } else if (BBCVs === 5) {
                            return [
                                { node: 'I', rate: 0.65 },
                                { node: 'M', rate: 0.35 },
                            ];
                        } else if (BBCVs === 6) {
                            return [
                                { node: 'I', rate: 0.85 },
                                { node: 'M', rate: 0.15 },
                            ];
                        }
                        break;
                    case 'J':
                        if (DD > 4) {
                            return 'M';
                        } else if (CL === 1 && DD > 3) {
                            return 'M';
                        } else {
                            return 'K';
                        }
                        break;
                    case 'K':
                        if (Ss > 0) {
                            return [
                                { node: 'K', rate: 0.5 },
                                { node: 'M', rate: 0.5 },
                            ];
                        } else if (BBs + CVL < 2) {
                            return 'M';
                        } else if (BBs + CVL === 2) {
                            return [
                                { node: 'K', rate: 0.25 },
                                { node: 'M', rate: 0.75 },
                            ];
                        } else if (BBs + CVL === 3) {
                            return [
                                { node: 'K', rate: 0.5 },
                                { node: 'M', rate: 0.5 },
                            ];
                        }
                        break;
                }
                break;
            case '3-4':
                switch (node) {
                    case null:
                        return '1';
                    case '1':
                        if (CL + Ds === 0 || BBCVs > 2) {
                            return 'A';
                        } else if (BBCVs === 2 || Ss > 0) {
                            return [
                                { node: 'A', rate: 0.35 },
                                { node: 'B', rate: 0.65 },
                            ];
                        } else if (BBCVs === 1) {
                            return 'B';
                        } else if (BBCVs === 0) {
                            if (DD < 3) {
                                return [
                                    { node: 'B', rate: 0.65 },
                                    { node: 'D', rate: 0.35 },
                                ];
                            } else {
                                return 'D';
                            }
                        } // 航戦より例外なし
                        break;
                    case 'C':
                        if (CV + CVB > 2 || CL + Ds === 0 || BBCVs > 4) {
                            return 'B';
                        } else if (BBCVs === 2) {
                            return 'F';
                        } else if (AV + AO > 0) {
                            return 'E';
                        } else if (AS > 0) {
                            return [
                                { node: 'E', rate: 0.5 },
                                { node: 'F', rate: 0.5 },
                            ];
                        } else {
                            return 'F';
                        }
                        break;
                    case 'F':
                        if (BBCVs + CAs > 4) {
                            return 'G';
                        } else if (BBs + CV + CVB < 3 && CL > 0 && Ds > 1) {
                            if (fleet.isFaster()) {
                                return 'J';
                            } else {
                                return [
                                    { node: 'G', rate: 0.1 },
                                    { node: 'J', rate: 0.45 },
                                    { node: 'M', rate: 0.45 },
                                ];
                            }
                        } else {
                            return [
                                { node: 'G', rate: 0.5 },
                                { node: 'M', rate: 0.5 },
                            ];
                        }
                        break;
                    case 'H':
                        if (DD < 3 || CL + DD < 4 || CV + CVB > 0 || BBs + CVL > 1) {
                            return 'G';
                        } else if (CL + DD > 4) {
                            return 'L';
                        } else if (CL === 0) {
                            return 'G';
                        } else {
                            return [
                                { node: 'G', rate: 0.35 },
                                { node: 'L', rate: 0.65 },
                            ];
                        }
                        break;
                    case 'L':
                        if (CAs + CL + DD === 6) {
                            return 'J';
                        } else if (BBs + CVL === 0) {
                            return 'N';
                        } else {
                            return [
                                { node: 'N', rate: 0.5 },
                                { node: 'O', rate: 0.5 },
                            ];
                        }
                        break;
                    case 'M':
                        if (CL > 0 && DD > 0) {
                            return 'P';
                        } else {
                            return [
                                { node: 'K', rate: 0.5 },
                                { node: 'P', rate: 0.5 },
                            ];
                        }
                        break;
                }
                break;
            case '3-5':
                switch (node) {
                    case null:
                        return '1';
                    case '1':
                        if (Ss > 2 || BBs > 1 || BBs + CAs > 2 || CVs + CLT > 0) {
                            return 'B';
                        } else if (DD > 4) {
                            return 'F';
                        } else if (DD === 4) {
                            return [
                                { node: 'B', rate: 0.25 },
                                { node: 'F', rate: 0.75 },
                            ];
                        } else if (DD < 4) {
                            return [
                                { node: 'B', rate: 0.5 },
                                { node: 'F', rate: 0.5 },
                            ];
                        } // DDより例外なし
                        break;
                    case 'B':
                        if (Ss > 3 || CVs > 3 || BBCVs > 4) {
                            return 'A';
                        } else if (CLT > 1 || CVs > 1 || BBs > 2 || BBCVs + CAs > 4) {
                            return 'D';
                        } else if (CVs === 0 && CL === 1 && DD > 1) {
                            return 'E';
                        } else {
                            return 'C';
                        }
                        break;
                    case 'F':
                        if (BBCVs + LHA > 0 || CL + CLT > 3 || CAs > 1) {
                            return 'E';
                        } else if (CAs === 1) {
                            return [
                                { node: 'E', rate: 0.25 },
                                { node: 'G', rate: 0.75 },
                            ];
                        } else if (CAs === 0) {
                            if (CL === 3) {
                                return [
                                    { node: 'E', rate: 0.15 },
                                    { node: 'G', rate: 0.85 },
                                ];
                            } else if (CL < 3) {
                                return 'G';
                            }
                        } // CAsより例外なし
                        break;
                    case 'G':
                        if (f_seek[3] < 23) {
                            return 'I';
                        } else if (f_seek[3] < 28 && f_seek[3] >= 23) {
                            return [
                                { node: 'I', rate: 0.5 },
                                { node: 'K', rate: 0.5 },
                            ];
                        } else if (f_seek[3] >= 28) {
                            return 'K';
                        } // 例外なし
                        break;
                    case 'H':
                        if (BBCVs > 3) {
                            return 'J';
                        } else if (BBCVs > 1 && LHA > 0) {
                            return 'J';
                        } else if (f_seek[3] < 35) {
                            return 'J';
                        } else if (f_seek[3] < 40 && f_seek[3] >= 35) {
                            return [
                                { node: 'J', rate: 0.5 },
                                { node: 'K', rate: 0.5 },
                            ];
                        } else if (f_seek[3] >= 40) {
                            return 'K';
                        } // f_seekより例外なし
                        break;
                }
                break;
            case '4-1':
                switch (node) {
                    case null:
                        return '1';
                    case '1':
                        return [
                            { node: 'A', rate: 0.5 },
                            { node: 'C', rate: 0.5 },
                        ];
                    case 'C':
                        if (BBCVs > 4) {
                            return 'E';
                        } else if (BBCVs === 4) {
                            return [
                                { node: 'E', rate: 0.7 },
                                { node: 'F', rate: 0.3 },
                            ];
                        } else if (BBCVs === 3) {
                            return [
                                { node: 'E', rate: 0.5 },
                                { node: 'F', rate: 0.5 },
                            ];
                        } else if (BBCVs < 3) {
                            return 'F';
                        } // BBCVsより例外なし
                        break;
                    case 'D':
                        if (BBCVs > 4) {
                            return 'H';
                        } else if (Ss < 0) {
                            return [
                                { node: 'G', rate: 0.3 },
                                { node: 'H', rate: 0.7 },
                            ];
                        } else if (BBCVs === 4 || Ds < 2) {
                            return 'G';
                        } else if (BBCVs === 0 || Ds > 3) {
                            return 'H';
                        } else if (Ds === 3 || CL === 0) {
                            return 'G';
                        } else if (CAs > 0 && CAs + CL + CT === 3) {
                            return 'H';
                        } else {
                            return [
                                { node: 'G', rate: 0.5 },
                                { node: 'H', rate: 0.5 },
                            ];
                        }
                        break;
                    case 'F':
                        if (BBCVs > 0 || Ds < 4) {
                            return 'D';
                        } else if (CL + CT > 0 || CAs === 0) {
                            return 'H';
                        } else {
                            return 'D';
                        }
                        break;
                    case 'H':
                        if (Ss === 1) {
                            return [
                                { node: 'I', rate: 0.5 },
                                { node: 'J', rate: 0.5 },
                            ];
                        } else if (Ss > 1) {
                            return 'I';
                        } else if (BBCVs > 4) {
                            return 'I';
                        } else if (BBCVs < 2) {
                            return 'J';
                        } else {
                            return [
                                { node: 'I', rate: 0.5 },
                                { node: 'J', rate: 0.5 },
                            ];
                        }
                        break;
                }
                break;
            case '4-2':
                switch (node) {
                    case null:
                        return '1';
                    case '1':
                        switch (Ds) {
                            case 0:
                                return [
                                    { node: 'A', rate: 0.1 },
                                    { node: 'B', rate: 0.9 },
                                ];
                            case 1:
                                return [
                                    { node: 'A', rate: 0.2 },
                                    { node: 'B', rate: 0.8 },
                                ];
                            case 2:
                                if (CV + CVB > 1) {
                                    return [
                                        { node: 'A', rate: 0.55 },
                                        { node: 'B', rate: 0.45 },
                                    ];
                                } else if (CVs > 1) {
                                    return [
                                        { node: 'A', rate: 0.6 },
                                        { node: 'B', rate: 0.4 },
                                    ];
                                } else if (CVs === 1) {
                                    return [
                                        { node: 'A', rate: 0.65 },
                                        { node: 'B', rate: 0.35 },
                                    ];
                                } else if (CVs === 0) {
                                    return [
                                        { node: 'A', rate: 0.725 },
                                        { node: 'B', rate: 0.275 },
                                    ];
                                } // CVsより例外なし
                                break;
                            case 3:
                                if (CVs > 1) {
                                    return [
                                        { node: 'A', rate: 0.725 },
                                        { node: 'B', rate: 0.275 },
                                    ];
                                } else if (CVs < 2) {
                                    return [
                                        { node: 'A', rate: 0.775 },
                                        { node: 'B', rate: 0.225 },
                                    ];
                                } // CVsより例外なし
                                break;
                            case 4:
                                return [
                                    { node: 'A', rate: 0.85 },
                                    { node: 'B', rate: 0.15 },
                                ];
                        } // 5以上は連合の条件漏れを防ぐために外に出す
                        return [
                            { node: 'A', rate: 0.9 },
                            { node: 'B', rate: 0.1 },
                        ];
                        break;
                    case 'A':
                        if (Ds < 2) {
                            return 'E';
                        } else if (Ss > 0) {
                            return [
                                { node: 'C', rate: 0.5 },
                                { node: 'E', rate: 0.5 },
                            ];
                        } else if (Ds > 3) {
                            return 'C';
                        } else if (CL > 0 && Ds > 2) {
                            return 'C';
                        } else if (Ds === 3) {
                            return [
                                { node: 'C', rate: 0.85 },
                                { node: 'E', rate: 0.15 },
                            ];
                        } else if (CL > 0 && Ds === 2) {
                            return [
                                { node: 'C', rate: 0.85 },
                                { node: 'E', rate: 0.15 },
                            ];
                        } else {
                            return [
                                { node: 'C', rate: 0.55 },
                                { node: 'E', rate: 0.45 },
                            ];
                        }
                        break;
                    case 'C':
                        if (Ds < 2 || BBCVs > 3) {
                            return 'G';
                        } else if (BBCVs === 3) {
                            if (CL === 0) {
                                return [
                                    { node: 'G', rate: 0.85 },
                                    { node: 'L', rate: 0.15 },
                                ];
                            } else {
                                return [
                                    { node: 'G', rate: 0.65 },
                                    { node: 'L', rate: 0.35 },
                                ];
                            }
                        } else if (CL > 0 || Ds > 3) {
                            return 'L';
                        } else {
                            return [
                                { node: 'G', rate: 0.65 },
                                { node: 'L', rate: 0.35 },
                            ];
                        }
                        break;
                    case 'D':
                        if (BBCVs === 6) {
                            return 'H';
                        } else if (BBCVs < 3) {
                            if (Ds > 1) {
                                return 'C';
                            } else {
                                return [
                                    { node: 'C', rate: 0.4 },
                                    { node: 'H', rate: 0.6 },
                                ];
                            }
                        } else if (Ds < 2) {
                            return [
                                { node: 'C', rate: 0.15 },
                                { node: 'H', rate: 0.85 },
                            ];
                        } else if (BBs === 4) {
                            return [
                                { node: 'C', rate: 0.3 },
                                { node: 'H', rate: 0.7 },
                            ];
                        } else {
                            return [
                                { node: 'C', rate: 0.5 },
                                { node: 'H', rate: 0.5 },
                            ];
                        }
                        break;
                    case 'G':
                        if (Ds > 2) {
                            return 'L';
                        } else if (Ds === 2) {
                            if (CL + CAV + AV > 0) {
                                return 'L';
                            } else if (BBs === 4) {
                                return 'L';
                            } else {
                                return [
                                    { node: 'F', rate: 0.35 },
                                    { node: 'L', rate: 0.65 },
                                ];
                            }
                        } else if (Ss > 0) {
                            return [
                                { node: 'F', rate: 0.5 },
                                { node: 'I', rate: 0.25 },
                                { node: 'L', rate: 0.25 },
                            ];
                        } else if (BBCVs > 4) {
                            return [
                                { node: 'F', rate: 0.25 },
                                { node: 'I', rate: 0.5 },
                                { node: 'L', rate: 0.25 },
                            ];
                        } else if (BBCVs < 2) {
                            return [
                                { node: 'F', rate: 0.15 },
                                { node: 'L', rate: 0.85 },
                            ];
                        } else {
                            return [
                                { node: 'F', rate: 0.4 },
                                { node: 'L', rate: 0.6 },
                            ];
                        }
                        break;
                    case 'H':
                        if (DD > 1) {
                            return 'G';
                        } else if (Ds > 1) {
                            return [
                                { node: 'G', rate: 0.8 },
                                { node: 'K', rate: 0.2 },
                            ];
                        } else if (BBCVs > 4) {
                            return [
                                { node: 'G', rate: 0.2 },
                                { node: 'K', rate: 0.8 },
                            ];
                        } else {
                            return [
                                { node: 'G', rate: 0.5 },
                                { node: 'K', rate: 0.5 },
                            ];
                        }
                        break;
                }
                break;
            case '4-3':
                switch (node) {
                    case null:
                        return '1';
                    case '1': // nullがヤな感じ 多分こういうことだろうという
                        if (CV + CVB > 0) {
                            return 'C';
                        } else if (Ds > 3 && (f_speed !== '低速艦隊' || BBs + CVL === 0)) {
                            return 'D';
                        } else if (Ds > 2 && CL > 0) {
                            return 'D';
                        } else if (Ds > 1 && CL + AO > 0) {
                            return 'A';
                        } else {
                            return [
                                { node: 'A', rate: 0.5 },
                                { node: 'C', rate: 0.5 },
                            ];
                        }
                        break;
                    case 'A':
                        if (AV + AO + BBV > 0) {
                            return 'B';
                        } else if (AO > 1 && Ds > 1) {
                            return 'D';
                        } else if (CVL > 0) {
                            return 'B';
                        } else {
                            return [
                                { node: 'B', rate: 0.5 },
                                { node: 'D', rate: 0.5 },
                            ];
                        }
                        break;
                    case 'B':
                        if (Ds < 2 || BBs + CVL > 2) {
                            return 'E';
                        } else if (f_speed !== '低速艦隊') {
                            return 'G';
                        } else {
                            return [
                                { node: 'E', rate: 0.65 },
                                { node: 'G', rate: 0.35 },
                            ];
                        }
                        break;
                    case 'C':
                        if (BBCVs > 3) {
                            return 'F';
                        } else if (Ss === 0 && CL === 1 && Ds > 1) {
                            return 'D';
                        } else {
                            return [
                                { node: 'D', rate: 0.2 },
                                { node: 'F', rate: 0.8 },
                            ];
                        }
                        break;
                    case 'F':
                        if (Ss > 0 || DD === 0 || CVs === 0) {
                            return 'K';
                        } else if (f_speed !== '低速艦隊' && BBCVs < 3 && DD > 1) {
                            return 'H';
                        } else {
                            return [
                                { node: 'H', rate: 0.3 },
                                { node: 'K', rate: 0.7 },
                            ];
                        }
                        break;
                    case 'G':
                        if (CVL === 0) {
                            return 'J';
                        } else {
                            return [
                                { node: 'H', rate: 0.65 },
                                { node: 'I', rate: 0.35 },
                            ];
                        }
                        break;
                    case 'H':
                        if (CVs === 2) {
                            return [
                                { node: 'I', rate: 0.1 },
                                { node: 'N', rate: 0.9 },
                            ];
                        } else if (CVs === 0 && CA === 2) {
                            return [
                                { node: 'I', rate: 0.2 },
                                { node: 'N', rate: 0.8 },
                            ];
                        } else {
                            return [
                                { node: 'I', rate: 0.3 },
                                { node: 'N', rate: 0.7 },
                            ];
                        }
                        break;
                    case 'K':
                        if (Ss > 0 || (CVs > 2 || CVs === 0) || Ds < 2) {
                            return 'L';
                        } else if (CV + CVB === 1 && AV + CVL === 1) {
                            return [
                                { node: 'L', rate: 0.55 },
                                { node: 'N', rate: 0.45 },
                            ];
                        } else if (CVs === 2) {
                            return [
                                { node: 'L', rate: 0.675 },
                                { node: 'N', rate: 0.325 },
                            ];
                        } else if (CVs === 1) {
                            return [
                                { node: 'L', rate: 0.85 },
                                { node: 'N', rate: 0.15 },
                            ];
                        }
                        break;
                    case 'L':
                        if (CL + Ds === 0 || BBCVs > 4 || CVs === 0) {
                            return 'M';
                        } else if (CA > 1) {
                            return 'N';
                        } else if (Ss > 0) {
                            return [
                                { node: 'M', rate: 0.5 },
                                { node: 'N', rate: 0.5 },
                            ];
                        } else if (BBCVs < 3) {
                            return 'N';
                        } else {
                            return [
                                { node: 'M', rate: 0.5 },
                                { node: 'N', rate: 0.5 },
                            ];
                        }
                        break;
                }
                break;
            case '4-4':
                switch (node) {
                    case null:
                        return '1';
                    case '1':
                        if (Ds > 1) {
                            return 'A';
                        } else {
                            return [
                                { node: 'A', rate: 0.5 },
                                { node: 'B', rate: 0.5 },
                            ];
                        }
                        break;
                    case 'B':
                        if (BBCVs > 3) {
                            return 'A';
                        } else if (CA > 0) {
                            return [
                                { node: 'D', rate: 0.7 },
                                { node: 'F', rate: 0.3 },
                            ];
                        } else {
                            return 'D';
                        }
                        break;
                    case 'E':
                        if (BBs + CV + CVB > 3) {
                            return 'G';
                        } else if (CAs + CL > 0 && Ds > 1) {
                            return 'I';
                        } else if (DE > 2) {
                            return 'C';
                        } else if (DE > 1 && AO + AS > 0) {
                            return 'C';
                        } else if (Ds > 1) {
                            if (BBCVs > 3) {
                                return [
                                    { node: 'G', rate: 0.8 },
                                    { node: 'I', rate: 0.2 },
                                ];
                            } else if (BBCVs < 4) {
                                return [
                                    { node: 'G', rate: 0.35 },
                                    { node: 'I', rate: 0.65 },
                                ];
                            } // BBCVsより例外なし
                        } else if (Ss > 3) {
                            return 'G';
                        } else {
                            return [
                                { node: 'G', rate: 0.5 },
                                { node: 'I', rate: 0.5 },
                            ];
                        }
                        break;
                    case 'F':
                        if (BBCVs > 2) {
                            return 'H';
                        } else {
                            return 'I';
                        }
                        break;
                    case 'G': {
                        return [
                            { node: 'C', rate: 0.25 },
                            { node: 'J', rate: 0.25 },
                            { node: 'I', rate: 0.5 },
                        ];
                        break;
                    }
                    case 'I':
                        if (Ds > 1) {
                            if (CV + CVB === 2 || CAs === 2 || (CV + CVB === 0 && CL > 0)) {
                                return 'K';
                            } else {
                                return [
                                    { node: 'H', rate: 0.25 },
                                    { node: 'K', rate: 0.75 },
                                ];
                            }
                        } else {
                            return [
                                { node: 'H', rate: 0.5 },
                                { node: 'K', rate: 0.5 },
                            ];
                        }
                        break;
                }
                break;
            case '4-5':
                switch (node) {
                    case null:
                        return '1';
                    case '1':
                        return [
                            { node: 'A', rate: 0.5 },
                            { node: 'C', rate: 0.5 },
                        ];
                        break;
                    case 'A':
                        if (option.A === 'B') {
                            return 'B';
                        } else {
                            return 'D';
                        }
                        break;
                    case 'C':
                        if (option.C === 'F') {
                            return 'D';
                        } else {
                            return 'F';
                        }
                        break;
                    case 'E':
                        if (fleet.isFaster() || AO > 0 || BBCVs > 2) {
                            return 'M';
                        } else if (CL > 0 && Ds > 1) {
                            return 'M';
                        } else {
                            return 'K';
                        }
                        break;
                    case 'G':
                        if (CL > 0 && Ds > 1) {
                            return 'H';
                        } else {
                            return [
                                { node: 'D', rate: 0.5 },
                                { node: 'H', rate: 0.5 },
                            ];
                        }
                        break;
                    case 'H':
                        if (fleet.isFaster() && BBCVs < 5) {
                            return 'T';
                        } else if (CL === 1 && Ds > 2) {
                            return 'T';
                        } else if (!track.includes('D') && CL === 1 && Ds > 1) {
                            return 'T';
                        } else {
                            return 'K';
                        }
                        break;
                    case 'I':
                        if (option.I === 'G') {
                            return 'G';
                        } else {
                            return 'J';
                        }
                        break;
                    case 'K':
                        if (track.includes('E')) {
                            return 'M';
                        } else if (BBs + CV + CVB > 3) {
                            return 'M';
                        } else if (BBCVs > 4) {
                            return 'M';
                        } else if (AO > 0) {
                            return 'M';
                        } else if (f_seek[1] < 63) {
                            return 'L';
                        } else if (f_seek[1] < 70 && f_seek[1] >= 63) {
                            if (Ss > 0) {
                                return [
                                    { node: 'L', rate: 0.333 },
                                    { node: 'M', rate: 0.333 },
                                    { node: 'T', rate: 0.334 },
                                ];
                            } else {
                                return [
                                    { node: 'L', rate: 0.5 },
                                    { node: 'T', rate: 0.5 },
                                ];
                            }
                        } else if (Ss > 0) {
                            return [
                                { node: 'M', rate: 0.5 },
                                { node: 'T', rate: 0.5 },
                            ];
                        } else if (f_seek[1] >= 70) {
                            return 'T';
                        } // LoSより例外なし
                        break;
                    case 'M':
                        if (f_speed === '最速艦隊') {
                            return 'N';
                        } else if (DD < 2) {
                            return 'R';
                        } else if (f_speed === '高速+艦隊') {
                            return 'N';
                        } else if (f_speed === '低速艦隊') {
                            return 'R';
                        } else if (BBs + CV + CVB < 2) {
                            return 'N';
                        } else {
                            return 'R';
                        }
                        break;
                    case 'O':
                        if (BBCVs > 4) {
                            return 'N';
                        } else {
                            return [
                                { node: 'Q', rate: 0.5 },
                                { node: 'T', rate: 0.5 },
                            ];
                        }
                        break;
                    case 'Q':
                        if (f_seek[1] < 55) {
                            return 'P';
                        } else if (f_seek[1] < 59 && f_seek[1] >= 55) {
                            if (BBCVs > 4) {
                                return [
                                    { node: 'O', rate: 0.5 },
                                    { node: 'P', rate: 0.5 },
                                ];
                            } else if (DD === 0) {
                                return [
                                    { node: 'O', rate: 0.5 },
                                    { node: 'P', rate: 0.5 },
                                ];
                            } else {
                                return [
                                    { node: 'N', rate: 0.5 },
                                    { node: 'P', rate: 0.5 },
                                ];
                            }
                        } else if (BBCVs > 4 || DD === 0) {
                            return 'O';
                        } else if (f_seek[1] >= 59) {
                            return 'N';
                        } // LoSより例外なし
                        break;
                    case 'R':
                        if (fleet.isFaster()) {
                            return 'N';
                        } else if (f_speed !== '低速艦隊' && CL + CAV > 0 && DD > 1) {
                            return 'N';
                        } else {
                            return 'S';
                        }
                        break;
                }
                break;
            case '5-1':
                switch (node) {
                    case null:
                        return '1';
                    case '1':
                        if (BBCVs > 4) {
                            return 'A';
                        } else if (BBCVs < 3 && DD > 1) {
                            return 'B';
                        } else if (CAs > 3 && CL > 0) {
                            return 'B';
                        } else if (CAs > 1 && CL === 1) {
                            return 'B';
                        } else if (BBs === 3 && CL === 1 && DD === 2) {
                            return [
                                { node: 'A', rate: 0.25 },
                                { node: 'B', rate: 0.75 },
                            ];
                        } else {
                            return [
                                { node: 'A', rate: 0.5 },
                                { node: 'B', rate: 0.5 },
                            ];
                        }
                        break;
                    case 'B':
                        if (CV + CVB > 0 || CVL > 1) {
                            return 'E';
                        } else if (BBs < 3) {
                            return 'C';
                        } else if (CL === 1) {
                            return 'E';
                        } else if (DD > 1) {
                            return 'C';
                        } else {
                            return [
                                { node: 'C', rate: 0.5 },
                                { node: 'E', rate: 0.5 },
                            ];
                        }
                        break;
                    case 'F':
                        if (CL + DD === 0 || BBs + CVL > 3) {
                            return 'H';
                        } else if (BBs + CVL === 3) {
                            return [
                                { node: 'G', rate: 0.333 },
                                { node: 'H', rate: 0.333 },
                                { node: 'J', rate: 0.334 },
                            ];
                        } else if (f_speed === '最速艦隊') {
                            return 'J';
                        } else if (CL > 0) {
                            if (DD > 1) {
                                return 'J';
                            } else {
                                return 'G';
                            }
                        } else if (DD > 3) {
                            return 'J';
                        } else if (DD === 3) {
                            return [
                                { node: 'G', rate: 0.3 },
                                { node: 'J', rate: 0.7 },
                            ];
                        } else if (DD === 2) {
                            return [
                                { node: 'G', rate: 0.7 },
                                { node: 'J', rate: 0.3 },
                            ];
                        } else if (DD === 1) {
                            return 'G';
                        } // 軽巡か駆逐のどちらかに引っかかるので例外なし
                        break;
                    case 'G':
                        if (BBCVs > 4) {
                            return 'I';
                        } else if (CVs > 0 && BBCVs > 2) {
                            return [
                                { node: 'I', rate: 0.5 },
                                { node: 'J', rate: 0.5 },
                            ];
                        } else if (Ss > 0) {
                            return [
                                { node: 'I', rate: 0.5 },
                                { node: 'J', rate: 0.5 },
                            ];
                        } else if (fleet.isFaster()) {
                            return 'J';
                        } else if (CAs > 3) {
                            if (BBCVs + CLT === 0) {
                                return 'J';
                            } else {
                                return [
                                    { node: 'I', rate: 0.3 },
                                    { node: 'J', rate: 0.7 },
                                ];
                            }
                        } else if (CV + CVB > 0) {
                            return [
                                { node: 'I', rate: 0.7 },
                                { node: 'J', rate: 0.3 },
                            ];
                        } else if (DD > 3) {
                            return 'J';
                        } else if (CAs > 1 && DD > 1) {
                            return 'J';
                        } else if (CL > 0 && DD > 1) {
                            return 'J';
                        } else if (BBs === 3 && CL === 1 && CAs === 2) {
                            return [
                                { node: 'I', rate: 0.15 },
                                { node: 'J', rate: 0.85 },
                            ];
                        } else {
                            return [
                                { node: 'I', rate: 0.7 },
                                { node: 'J', rate: 0.3 },
                            ];
                        }
                        break;
                }
                break;
            case '5-2':
                switch (node) {
                    case null:
                        return '1';
                    case '1':
                        if (BBCVs > 4 || BBs > 3 || CV + CVB > 2 || Ss > 0) {
                            return [
                                { node: 'A', rate: 0.5 },
                                { node: 'B', rate: 0.5 },
                            ];
                        } else {
                            return 'B';
                        }
                        break;
                    case 'C':
                        if (CVs === 2 && CAs === 2 && DD === 2) {
                            return 'D';
                        } else if (fleet.isInclude('夕張') && CVL + CAs + DD + AO === 5) {
                            return 'D';
                        } else if (fleet.isInclude('祥鳳') && CAs + CL + CT + DD + AO === 5) {
                            return 'D';
                        } else if (f_speed === '低速艦隊') {
                            return 'E';
                        } else if (fleet.isInclude('翔鶴') && fleet.isInclude('瑞鶴') && DD > 1) {
                            return 'D';
                        } else if (BBs + CV + CVB > 0) {
                            return 'E';
                        } else if (CVL === 2 && DD > 1) {
                            return 'D';
                        } else if (CVL === 1 && CAs > 0 && DD > 1) {
                            return 'D';
                        } else {
                            return 'E';
                        }
                        break;
                    case 'D':
                        if (
                            (fleet.isInclude('祥鳳') && DD === 3)
                            && (((CA === 1 && (CL === 1 || AO === 1))
                            || AO === 2))
                        ) {
                            return 'G';
                        } else if (fleet.isInclude('夕張') && DD >= 2) {
                            if (DD === 3
                                || (AO === 1 && (DD === 2 || CA === 2))
                                || (AO == 2 && (DD === 1 || CA === 2))
                                || (fleet.isInclude('祥鳳') && (CA === 2 || AO === 2))
                            ) {
                                return 'G';
                            } else {
                                return 'F';
                            }
                        } else {
                            return 'F';
                        }
                        break;
                    case 'F':
                        if (f_seek[1] < 63) {
                            return 'H';
                        } else if (f_seek[1] < 70 && f_seek[1] >= 63) {
                            if (BBs + CV + CVB > 4) {
                                return [
                                    { node: 'H', rate: 0.5 },
                                    { node: 'I', rate: 0.5 },
                                ];
                            } else if (BBs > 2 || CVs > 2) {
                                return [
                                    { node: 'H', rate: 0.333 },
                                    { node: 'I', rate: 0.333 },
                                    { node: 'O', rate: 0.334 },
                                ];
                            } else {
                                return [
                                    { node: 'H', rate: 0.5 },
                                    { node: 'O', rate: 0.5 },
                                ];
                            }
                        } else if (BBs + CV + CVB > 4) {
                            return 'I';
                        } else if (BBs > 2 || CVs > 2) {
                            return [
                                { node: 'I', rate: 0.7 },
                                { node: 'O', rate: 0.3 },
                            ];
                        } else if (f_seek[1] >= 70) {
                            return 'O';
                        } // LoSより例外なし
                        break;
                    case 'G':
                        if (fleet.isInclude('祥鳳') && fleet.isInclude('夕張')) {
                            return [
                                { node: 'J', rate: 0.55 },
                                { node: 'L', rate: 0.45 },
                            ];
                        } else {
                            return [
                                { node: 'J', rate: 0.85 },
                                { node: 'L', rate: 0.15 },
                            ];
                        }
                        break;
                    case 'L':
                        if (!fleet.isInclude('祥鳳') && !fleet.isInclude('夕張')) {
                            if (fleet.isFaster()) {
                                return [
                                    { node: 'K', rate: 0.5 },
                                    { node: 'N', rate: 0.5 },
                                ];
                            } else if (f_seek[1] < 60) {
                                return [
                                    { node: 'M', rate: 0.5 },
                                    { node: 'N', rate: 0.5 },
                                ];
                            } else if (f_seek[1] < 62 && f_seek[1] >= 60) {
                                return [
                                    { node: 'K', rate: 0.333 },
                                    { node: 'M', rate: 0.333 },
                                    { node: 'N', rate: 0.334 },
                                ];
                            } else if (f_seek[1] >= 62) {
                                return [
                                    { node: 'K', rate: 0.5 },
                                    { node: 'N', rate: 0.5 },
                                ];
                            } // LoSより例外なし
                        } if (fleet.isFaster()) {
                            return 'K';
                        } else if (f_seek[1] < 60) {
                            return 'M';
                        } else if (f_seek[1] < 62 && f_seek[1] >= 60) {
                            return [
                                { node: 'K', rate: 0.5 },
                                { node: 'M', rate: 0.5 },
                            ];
                        } else if (f_seek[1] >= 62) {
                            return 'K';
                        } // LoSより例外なし
                        break;
                }
                break;
            case '5-3':
                switch (node) {
                    case null:
                        return '1';
                    case '1':
                        if (fleet.isFaster()) {
                            return 'D';
                        } else if (BBCVs > 2 || (BBCVs === 2 && f_speed === '低速艦隊')) {
                            return 'C';
                        } else if (Ss > 0) {
                            return [
                                { node: 'C', rate: 0.4 },
                                { node: 'D', rate: 0.6 },
                            ];
                        } else {
                            return 'D';
                        }
                        break;
                    case 'B':
                        return [
                            { node: 'A', rate: 0.65 },
                            { node: 'F', rate: 0.35 },
                        ];
                        break;
                    case 'E':
                        if (Ss > 0 || (BBCVs > 0 && DD < 2)) {
                            return [
                                { node: 'B', rate: 0.5 },
                                { node: 'Q', rate: 0.5 },
                            ];
                        } else if (CL > 0 || CAs > 3 || DD > 3) {
                            return 'Q';
                        } else {
                            return [
                                { node: 'B', rate: 0.5 },
                                { node: 'Q', rate: 0.5 },
                            ];
                        }
                        break;
                    case 'G':
                        if (BBV + CV + CVB + Ss > 0) {
                            return 'J';
                        } else if (DD === 0 || CVL > 1) {
                            return 'I';
                        } else if (CVL === 1) {
                            return 'J';
                        } else if (DD === 1) {
                            return 'I';
                        } else if (fleet.countSBB() > 1) {
                            return 'J';
                        } else {
                            return 'I';
                        }
                        break;
                    case 'I':
                        if (CVL > 0 || BBs > 2) {
                            return 'J';
                        } else if (DD > 2 || (CL > 0 && DD > 1)) {
                            return 'O';
                        } else if (BBs > 1) {
                            return 'J';
                        } else if (DD > 1) {
                            return 'O';
                        } else if (CL > 0 && CAs > 3 && CAs + CL + DD === 6) {
                            return 'O';
                        } else {
                            return [
                                { node: 'J', rate: 0.5 },
                                { node: 'O', rate: 0.5 },
                            ];
                        }
                        break;
                    case 'J':
                        if (Ss > 0) {
                            return [
                                { node: 'L', rate: 0.333 },
                                { node: 'M', rate: 0.333 },
                                { node: 'N', rate: 0.334 },
                            ];
                        } else if (BBCVs > 3 || CV + CVB > 0 || CVL > 1) {
                            return 'M';
                        } else if (CVL === 1) {
                            if (fleet.countSBB() > 1) {
                                return 'N';
                            } else if (BBV > 0) {
                                return [
                                    { node: 'L', rate: 0.5 },
                                    { node: 'N', rate: 0.5 },
                                ];
                            } else if (DD > 2 || (CL > 0 && DD > 1) || (CAs === 3 && DD === 2)) {
                                return 'L';
                            } else {
                                return [
                                    { node: 'L', rate: 0.5 },
                                    { node: 'N', rate: 0.5 },
                                ];
                            }
                        } else {
                            return [
                                { node: 'L', rate: 0.5 },
                                { node: 'N', rate: 0.5 },
                            ];
                        }
                        break;
                    case 'O':
                        if (option.O === 'K') {
                            return 'K';
                        } else {
                            return 'P';
                        }
                        break;
                    case 'K':
                        if (DD > 3 || (DD === 3 && CL === 1)) {
                            return 'H';
                        } else if (DD === 2 && (
                            fleet.isFaster()
                            || BBV + AO + AS > 0
                            || f_drum > 1
                            || f_craft > 1
                        )) {
                            return 'H';
                        } else {
                            return 'E';
                        }
                        break;
                }
                break;
            case '5-4':
                switch (node) {
                    case null:
                        return '1';
                    case '1':
                        if (CVs > 0) {
                            return 'B';
                        } else if (BBs > 2 || CAs > 4) {
                            return 'A';
                        } else if (f_drum + f_craft > 4 || DD > 3) {
                            return 'B';
                        } else if (CL === 1 && DD > 2) {
                            return 'B';
                        } else {
                            return 'A';
                        }
                        break;
                    case 'A':
                        if (Ss > 0 || BBs > 4 || DD > 1 || CAs > 2) {
                            return 'D';
                        } else {
                            return 'F';
                        }
                        break;
                    case 'B':
                        if (CVs + Ss > 0) {
                            return 'C';
                        } else if (BBs > 0 && f_speed === '低速艦隊') {
                            return 'D';
                        } else if (BBV + fleet.countSBB() > 1) {
                            return 'D';
                        } else if (fleet.isFaster() || (CL === 1 && DD > 2) || DD > 3) {
                            return 'E';
                        } else if (DD === 0) {
                            return 'D';
                        } else {
                            return [
                                { node: 'D', rate: 0.5 },
                                { node: 'E', rate: 0.5 },
                            ];
                        }
                        break;
                    case 'D':
                        if (Ss > 0 || fleet.countSBB() > 1 || BBs > 2) {
                            return 'F';
                        } else if (DD > 1) {
                            return 'E';
                        } else {
                            return 'F';
                        }
                        break;
                    case 'G':
                        if (Ss > 0 || BBs > 3) {
                            return 'K';
                        } else if (CV + CVB < 3) {
                            return 'L';
                        } else {
                            return [
                                { node: 'K', rate: 0.3 },
                                { node: 'L', rate: 0.7 },
                            ];
                        }
                        break;
                    case 'L':
                        if (fleet.isFaster()) {
                            return 'P';
                        } else if (f_seek[1] < 56) {
                            return 'N';
                        } else if ((f_seek[1] < 60 && f_seek[1] >= 56) || BBs + CV + CVB > 4) {
                            return [
                                { node: 'N', rate: 0.5 },
                                { node: 'P', rate: 0.5 },
                            ];
                        } else if (f_seek[1] >= 60) {
                            return 'P';
                        } // LoSより例外なし
                        break;
                    case 'M':
                        if (fleet.isFaster()) {
                            return 'P';
                        } else if (f_seek[1] < 41) {
                            return 'O';
                        } else if ((f_seek[1] < 45 && f_seek[1] >= 41)) {
                            return [
                                { node: 'O', rate: 0.5 },
                                { node: 'P', rate: 0.5 },
                            ];
                        } else if (f_seek[1] >= 45) {
                            if (Ss > 0) {
                                return [
                                    { node: 'O', rate: 0.334 },
                                    { node: 'P', rate: 0.666 },
                                ];
                            } else {
                                return 'P';
                            }
                        } // LoSより例外なし
                        break;
                }
                break;
            case '5-5':
                switch (node) {
                    case null:
                        return '1';
                    case '1':
                        if (DD > 3) {
                            return 'A';
                        } else if (f_drum > 3) {
                            return 'A';
                        } else if (f_craft > 3) {
                            return 'A';
                        } else {
                            return 'B';
                        }
                    case 'B':
                        if (CV + CVB > 2) {
                            return 'K';
                        } else if (BBs + CLT > 3) {
                            return 'K';
                        } else if (CLT > 2) {
                            return 'K';
                        } else if (DD < 2) {
                            return 'K';
                        } else {
                            return 'F';
                        }
                    case 'E':
                        if (f_speed === '最速艦隊') {
                            return 'H';
                        } else if ((DD > 1 && f_speed === '高速+艦隊')) {
                            return 'H';
                        } else {
                            return 'G';
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
                        } else if (BBCVs > 3) {
                            return 'L';
                        } else if (DD < 2) {
                            return 'L';
                        } else {
                            return 'O';
                        }
                    case 'N':
                        if (track.includes('M')) {
                            return 'O';
                        } else if (fleet.isFaster()) {
                            return 'O';
                        } else if (AO > 0) {
                            return 'O';
                        } else if (CV + CVB > 0) {
                            return 'M';
                        } else if (BBs + CVL > 2) {
                            return 'M';
                        } else if (DD < 2) {
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
            case '6-1':
                switch (node) {
                    case null:
                        return '1';
                    case '1':
                        if (BBCVs + CAs > 2 || BBs > 1) {
                            return 'B';
                        } else if (Ss > 2 && Ss === f_length) {
                            return 'A';
                        } else if (AS === 1 && Ss > 2 && AS + Ss === f_length) {
                            return 'A';
                        } else if (AS === 1 && Ss === 3 && DD === 2) {
                            return 'A';
                        } else if (AS === 1 && Ss === 4 && CL + DD === 1) {
                            return 'A';
                        } else if (CL + DD === 0) {
                            return 'B';
                        } else {
                            return 'C';
                        }
                        break;
                    case 'A':
                        if (AS > 0) {
                            return 'F';
                        } else {
                            return 'D';
                        }
                        break;
                    case 'G':
                        if (Ss < 3 || BBCVs + CAs === 2 || f_seek[3] < 12) {
                            return 'I';
                        } else if (AS > 0 && f_seek[3] >= 16) {
                            return 'H';
                        } else if (AS === 0 && f_seek[3] >= 16) {
                            return [
                                { node: 'H', rate: 0.85 },
                                { node: 'I', rate: 0.15 },
                            ];
                        } else {
                            return [
                                { node: 'H', rate: 0.5 },
                                { node: 'I', rate: 0.5 },
                            ];
                        }
                        break;
                    case 'H':
                        if (f_seek[3] < 20) {
                            return 'E';
                        } else if (AS > 0) {
                            if (f_seek[3] < 25 && f_seek[3] >= 20) {
                                return [
                                    { node: 'E', rate: 0.5 },
                                    { node: 'K', rate: 0.5 },
                                ];
                            } else if (f_seek[3] >= 25) {
                                return 'K';
                            } // LoSより例外なし
                        } else if (f_seek[3] < 25 && f_seek[3] >= 20) {
                            return [
                                { node: 'E', rate: 0.333 },
                                { node: 'J', rate: 0.333 },
                                { node: 'K', rate: 0.334 },
                            ];
                        } else if (f_seek[3] < 36 && f_seek[3] >= 25) {
                            return [
                                { node: 'J', rate: 0.5 },
                                { node: 'K', rate: 0.5 },
                            ];
                        } else if (f_seek[3] >= 36) {
                            return 'K';
                        } // LoSより例外なし
                        break;
                }
                break;
            case '6-2':
                switch (node) {
                    case null:
                        return '1';
                    case '1':
                        if (CL + DD > 3) {
                            return 'B';
                        } else if (BBV + CAV + AV + LHA < 2 && Ss < 5) {
                            if (BBCVs > 4) {
                                return 'B';
                            } else if (BBCVs > 3) {
                                return [
                                    { node: 'B', rate: 0.65 },
                                    { node: 'C', rate: 0.35 },
                                ];
                            } else {
                                return 'C';
                            }
                        } else {
                            return 'C';
                        }
                        break;
                    case 'B':
                        if (CL + DD > 4) {
                            return 'D';
                        } else if (CVs < 3 && BBs === 0) {
                            return [
                                { node: 'C', rate: 0.7 },
                                { node: 'D', rate: 0.3 },
                            ];
                        } else {
                            return 'C';
                        }
                        break;
                    case 'C':
                        if (Ss === 6 || BBCVs > 4 || BBCVs + CAs === 6 || BBCVs + Ss === 6) {
                            return 'A';
                        } else if (BBCVs < 3) {
                            return 'E';
                        } else {
                            return 'D';
                        }
                        break;
                    case 'D':
                        if (DD < 3 || BBCVs > 0 || CL + DD < 5) {
                            return 'F';
                        } else {
                            return 'H';
                        }
                        break;
                    case 'E':
                        if (BBs > 1 || CVs > 1 || DD < 2) {
                            return 'F';
                        } else if (f_seek[2] < 43) {
                            return 'I';
                        } else if (f_seek[2] < 50 && f_seek[2] >= 43) {
                            return [
                                { node: 'I', rate: 0.5 },
                                { node: 'J', rate: 0.5 },
                            ];
                        } else if (f_seek[2] >= 50) {
                            return 'J';
                        } // LoSより例外なし
                        break;
                    case 'H':
                        if (f_seek[2] < 32) {
                            return 'G';
                        } else {
                            return 'K';
                        }
                        break;
                    case 'I':
                        if (Ss > 3) {
                            return 'G';
                        } else if (f_seek[2] < 35) {
                            return 'G';
                        } else if (f_seek[2] < 40 && f_seek[2] >= 35) {
                            return [
                                { node: 'G', rate: 0.5 },
                                { node: 'K', rate: 0.5 },
                            ];
                        } else if (f_seek[2] >= 40) {
                            return 'K';
                        } // LoSより例外なし
                        break;
                }
                break;
            case '6-3':
                switch (node) {
                    case null:
                        return '1';
                    case 'A':
                        if (option.A === 'B') {
                            return 'B';
                        } else {
                            return 'C';
                        }
                        break;
                    case 'E':
                        if (AV < 2) {
                            if (CL < 2 && DD > 2) {
                                return 'G';
                            } else if (CL < 3) {
                                return [
                                    { node: 'F', rate: 0.6 },
                                    { node: 'G', rate: 0.4 },
                                ];
                            } else {
                                return 'F';
                            }
                        } else {
                            return 'F';
                        }
                        break;
                    case 'H':
                        if (f_seek[2] < 36) {
                            return 'I';
                        } else if (f_seek[2] < 38 && f_seek[2] >= 36) {
                            return [
                                { node: 'I', rate: 0.5 },
                                { node: 'J', rate: 0.5 },
                            ];
                        } else if (f_seek[2] >= 38) {
                            return 'J';
                        } // LoSより例外なし
                        break;
                }
                break;
            case '6-4':
                switch (node) {
                    case null:
                        if (LHA + CVs > 0) {
                            return '2';
                        } else if (!fleet.isInclude('長門改二') && !fleet.isInclude('陸奥改二') && BBs === 2) {
                            return '2';
                        } else if (CAV > 2) {
                            return '2';
                        } else if (f_speed !== '低速艦隊' &&
                            ((fleet.isFCL() && DD === 3)
                            || DD > 3)) {
                            return '1';
                        } else if (DD > 1) {
                            return '1';
                        } else {
                            return '2';
                        }
                        break;
                    case '1':
                        if (f_speed !== '低速艦隊' &&
                            ((fleet.isFCL() && DD === 3)
                                || DD > 3)) {
                            return '1';
                        } else if (DD > 1) {
                            return '1';
                        } // これ以外は既に2へ行ってるので例外なし。でもちょっとヤだね
                        break;
                    case 'A':
                        if (fleet.isInclude('秋津洲') &&
                        (CAV === 1
                        || CL > 0
                        || DD > 2)) {
                            return 'D';
                        } else if (BBs > 0 || f_speed === '低速艦隊') {
                            return 'E';
                        } else if (fleet.isFCL() || DD > 2) {
                            return 'D';
                        } else {
                            return 'E';
                        }
                        break;
                    case 'E':
                        if (fleet.isInclude('秋津洲') || fleet.isInclude('如月')) {
                            return 'D';
                        } else if (CAs < 2 && CL > 0 && f_speed !== '低速艦隊') {
                            return 'D';
                        } else {
                            return 'G';
                        }
                        break;
                    case 'J':
                        if (CL === 0 || DD < 2) {
                            return 'L';
                        } else if (LHA > 0) {
                            return 'N';
                        } else if (CVs === 2 && f_speed === '低速艦隊') {
                            return 'L';
                        } else if (CVs === 2 && BBs > 0) {
                            return 'L';
                        } else {
                            return 'I';
                        }
                        break;
                    case 'K':
                        if (BBs === 2 || BBs + CAs > 2) {
                            return 'H';
                        } else if (DD > 1) {
                            return 'J';
                        } else {
                            return 'H';
                        }
                        break;
                }
                break;
            case '6-5':
                switch (node) {
                    case null:
                        if (CL === 0 || CVs + CLT > 0 || BBs > 3) {
                            return '1';
                        } else {
                            return '2';
                        }
                        break;
                    case 'B':
                        if (BBs === 3 || DD < 2) {
                            return 'C';
                        } else {
                            return 'F';
                        }
                        break;
                    case 'C':
                        if (DD === 0 || CLT > 1 || BBCVs > 3 || BBCVs + CAs > 4) {
                            return 'E';
                        } else {
                            return 'D';
                        }
                        break;
                    case 'E':
                        if (CVs > 0 && CL > 0 && DD > 0) {
                            return 'H';
                        } else {
                            return 'I';
                        }
                        break;
                    case 'G':
                        if (f_seek[2] < 50) {
                            return 'K';
                        } else {
                            return 'M';
                        }
                        break;
                    case 'I':
                        if (CL === 0) {
                            return 'H';
                        } else if (DD > 1) {
                            return 'J';
                        } else if (BBs === 0 && CVs + CAs < 5 && CVs < 3 && CAs < 5) {
                            return 'J';
                        } else {
                            return 'H';
                        }
                        break;
                    case 'J':
                        if (f_seek[2] < 35) {
                            return 'L';
                        } else {
                            return 'M';
                        }
                        break;
                }
                break;
            case '7-1':
                switch (node) {
                    case null:
                        return '1';
                    case '1':
                        if (Ss > 0) {
                            if (BBCVs > 0 || f_length > 4) {
                                return [
                                    { node: 'B', rate: 0.5 },
                                    { node: 'D', rate: 0.5 },
                                ];
                            } else if (f_length < 5) {
                                return [
                                    { node: 'B', rate: 0.333 },
                                    { node: 'D', rate: 0.333 },
                                    { node: 'F', rate: 0.334 },
                                ];
                            } // f_lengthより例外なし
                        } else if (BBCVs > 0 || f_length === 6) {
                            return 'B';
                        } else if (f_length === 5 || AO > 0) {
                            return 'D';
                        } else if (f_length < 5) {
                            return 'F';
                        } // f_lengthより例外なし
                        break;
                    case 'B':
                        if (BBs + CV + CVB > 0 || CVL > 1 || CAs > 2) {
                            return 'A';
                        } else if (DD + DE > 1) {
                            return 'C';
                        } else {
                            return [
                                { node: 'A', rate: 0.5 },
                                { node: 'C', rate: 0.5 },
                            ];
                        }
                        break;
                    case 'D':
                        if (CL === 1 && DD === 4) {
                            return 'E';
                        } else if (DD > 0 && DE > 2) {
                            return 'E';
                        } else if (AO > 0 && DE > 2) {
                            return 'E';
                        } else if (Ds === 5) {
                            return 'E';
                        } else if (Ds === 4) {
                            if (CT + AO > 0) {
                                return 'E';
                            } else if (AV > 0) {
                                return [
                                    { node: 'C', rate: 0.5 },
                                    { node: 'E', rate: 0.5 },
                                ];
                            } else {
                                return [
                                    { node: 'C', rate: 0.5 },
                                    { node: 'E', rate: 0.5 },
                                ];
                            }
                        } else {
                            return [
                                { node: 'C', rate: 0.5 },
                                { node: 'E', rate: 0.5 },
                            ];
                        }
                        break;
                    case 'H':
                        if (CL > 0 && DD > 3) {
                            return 'K';
                        } else if (DD > 0 && DE > 2) {
                            return 'K';
                        } else if (AO > 0) {
                            return [
                                { node: 'I', rate: 0.5 },
                                { node: 'K', rate: 0.5 },
                            ];
                        } else if (BBCVs > 1) {
                            return 'J';
                        } else if (BBCVs === 1) {
                            return [
                                { node: 'I', rate: 0.333 },
                                { node: 'J', rate: 0.333 },
                                { node: 'K', rate: 0.334 },
                            ];
                        } else {
                            return [
                                { node: 'I', rate: 0.225 },
                                { node: 'J', rate: 0.075 },
                                { node: 'K', rate: 0.7 },
                            ];
                        }
                        break;
                }
                break;
            case '7-2':
                switch (node) {
                    case null:
                        return '1';
                    case '1':
                        if (Ds < 2 || Ss > 0) {
                            return 'A';
                        } else if (f_length === 6) {
                            if (CV + CVB > 1 || BBs + CV + CVB > 3 || CL + CT > 2) {
                                return 'A';
                            } else {
                                return 'B';
                            }
                        } else if (f_length === 5) {
                            if (CV + CVB > 2) {
                                return 'A';
                            } else if (BBs + CV + CVB > 0 || CL + CT > 1 || DE < 3) {
                                return 'B';
                            } else {
                                return 'C';
                            }
                        } else if (f_length < 5) {
                            if (BBs + CV + CVB > 0 || Ds < 3) {
                                return 'B';
                            } else {
                                return 'C';
                            }
                        } // f_lengthより例外なし
                        break;
                    case 'C':
                        if (AO + Ss > 0) {
                            return 'D';
                        } else if (f_length === 6) {
                            if (BBs + CV + CVB > 0) {
                                return 'D';
                            } else if (Ds > 3) {
                                return 'E';
                            } else {
                                return 'D';
                            }
                        } else if (f_length === 5) {
                            if (BBs + CV + CVB > 1) {
                                return 'D';
                            } else if (Ds > 3 || DE > 2) {
                                return 'E';
                            } else {
                                return 'D';
                            }
                        } else if (f_length < 5) {
                            if (BBs + CV + CVB > 1) {
                                return 'D';
                            } else if (Ds > 2 || DE > 1) {
                                return 'E';
                            } else {
                                return 'D';
                            }
                        } // f_lengthより例外なし
                        break;
                    case 'D':
                        if (fleet.isFaster()) {
                            return 'I';
                        } else if (BBCVs > 3) {
                            return 'H';
                        } else if (f_speed !== '低速艦隊') {
                            return 'I';
                        } else if (BBCVs === 3) {
                            return 'H';
                        } else if (BBCVs === 2) {
                            return [
                                { node: 'H', rate: 0.35 },
                                { node: 'I', rate: 0.65 },
                            ];
                        } else if (BBCVs < 2) {
                            return 'I';
                        } // BBCVsより例外なし
                        break;
                    case 'E':
                        if (f_length < 6 || Ds > 4 || (DD > 0 && DE > 2)) {
                            return 'G';
                        } else if (f_seek[3] < 46) {
                            return 'F';
                        } else {
                            return 'G';
                        }
                        break;
                    case 'I':
                        if (AO > 0 || (AV > 0 && Ds > 2)) {
                            return 'J';
                        } else if (f_seek[3] < 63) {
                            return 'L';
                        } else if (f_seek[3] < 69 && f_seek[3] >= 63) {
                            return [
                                { node: 'J', rate: 0.333 },
                                { node: 'L', rate: 0.333 },
                                { node: 'M', rate: 0.334 },
                            ];
                        } else if (f_seek[3] >= 69) {
                            return 'M';
                        } // LoSより例外なし
                        break;
                }
                break;
            case '7-3':
                if (option.phase === '1') {
                    switch (node) {
                        case null:
                            return '1';
                        case 'A':
                            if (f_length === 1) {
                                return 'C';
                            } else if (CA === 0 || CVs > 0 || Ds === 0 || f_length > 4) {
                                return 'B';
                            } else if (fleet.isInclude('羽黒') && fleet.isInclude('神風')) {
                                return 'C';
                            } else if (f_length === 4) {
                                if (CA > 1 || Ds < 2) {
                                    return 'B';
                                } else if (CA + CL + Ds === f_length) {
                                    return 'C';
                                } else {
                                    return 'B';
                                }
                            } else if (f_length < 4) {
                                if (CA + CL + Ds === f_length) {
                                    return 'C';
                                } else {
                                    return 'B';
                                }
                            } // f_lengthより例外なし
                            break;
                        case 'C':
                            if (BBCVs > 0 || Ds === 0 || f_length > 4) {
                                return 'D';
                            } else if (fleet.isInclude('羽黒') && fleet.isInclude('神風')) {
                                if (CAs > 2) {
                                    return 'D';
                                } else if (fleet.isInclude('足柄') || fleet.isInclude('妙高')) {
                                    return 'E';
                                } else if (Ds < 2) {
                                    return 'D';
                                } else {
                                    return 'E';
                                }
                            } else if (f_length === 4) {
                                if (fleet.isInclude('羽黒') && Ds === 3) {
                                    return 'E';
                                } else if (fleet.isInclude('神風') && Ds === 4) {
                                    return 'E';
                                } else {
                                    return 'D';
                                }
                            } else if (f_length === 3) {
                                if (CAs > 1 || Ds < 2) {
                                    return 'D';
                                } else if (CA + Ds === f_length) {
                                    return 'E';
                                } else {
                                    return 'D';
                                }
                            } else if (f_length < 3) {
                                return 'E';
                            } // f_lengthより例外なし
                            break;
                        case 'D':
                            if (BBCVs > 0 || f_length === 6 || CAs > 3 || CAV > 1) {
                                return 'F';
                            } else {
                                return 'E';
                            }
                            break;
                    }
                } else {
                    switch (node) {
                        case null:
                            return '1';
                        case 'A':
                            if (f_length === 1) {
                                return 'C';
                            } else if (CVs > 0) {
                                return 'B';
                            } else if (AO === 1 && Ds > 2) {
                                return 'C';
                            } else if (CA === 0 || Ds === 0 || (BBs > 0 && !fleet.isInclude('羽黒'))) {
                                return 'B';
                            } else if (fleet.isInclude('羽黒') && fleet.isInclude('神風')) {
                                return 'C';
                            } else if (f_length > 4) {
                                if (!fleet.isInclude('羽黒') && f_speed === '低速艦隊') {
                                    return 'B';
                                } else if (Ds < 3) {
                                    return 'B';
                                } else {
                                    return 'C';
                                }
                            } else if (f_length === 4) {
                                if (CA > 1 || Ds < 2) {
                                    return 'B';
                                } else if (CA + CL + Ds === f_length) {
                                    return 'C';
                                } else {
                                    return 'B';
                                }
                            } else if (f_length < 4) {
                                if (CA + CL + Ds === f_length) {
                                    return 'C';
                                } else {
                                    return 'B';
                                }
                            }
                            break;
                        case 'C':
                            if (BBCVs > 0 || Ds === 0) {
                                return 'D';
                            } else if (f_speed === '最速艦隊') {
                                return 'I';
                            } else if (f_length > 4) {
                                if (fleet.isFaster() && CL + DD > 3) {
                                    return 'I';
                                } else if (f_length === 6) {
                                    return 'D';
                                } else if (fleet.isInclude('羽黒') && fleet.isInclude('神風')) {
                                    if (Ds < 2) {
                                        return 'D';
                                    } else if (CL > 0 || fleet.isInclude('足柄')) {
                                        return 'I';
                                    } else {
                                        return 'D';
                                    }
                                } else if (f_speed !== '低速艦隊' && CA === 1 && CL === 1 && DD === 3) {
                                    return 'I';
                                } else {
                                    return 'D';
                                }
                            } else if (f_length === 4) {
                                if (fleet.isInclude('羽黒') && fleet.isInclude('神風')) {
                                    if (CAs > 2) {
                                        return 'D';
                                    } else if (fleet.isInclude('足柄') || fleet.isInclude('妙高')) {
                                        return 'E';
                                    } else if (Ds < 2) {
                                        return 'D';
                                    } else {
                                        return 'E';
                                    }
                                } else if (fleet.isInclude('羽黒') && Ds === 3) {
                                    return 'E';
                                } else if (fleet.isInclude('神風') && Ds === 4) {
                                    return 'E';
                                } else {
                                    return 'D';
                                }
                            } else if (f_length < 4) {
                                if (CAs > 1 || Ds < 2) {
                                    return 'D';
                                } else if (CA + Ds === f_length) {
                                    return 'E';
                                } else {
                                    return 'D';
                                }
                            } else if (f_length < 3) {
                                return 'E';
                            } // f_lengthより例外なし
                            break;
                        case 'D':
                            if (BBs > 2 || CVs > 2 || CAV > 2) {
                                return 'F';
                            } else {
                                return 'G';
                            }
                            break;
                        case 'G':
                            if (CA === 0 && Ds > 1 && (AO > 0 || AV > 1)) {
                                return 'H';
                            } else if (Ss > 0) {
                                return 'I';
                            } else if (BBCVs > 0) {
                                return 'J';
                            } else if (fleet.isInclude('羽黒') && fleet.isInclude('神風')) {
                                if (f_length < 5) {
                                    return 'P';
                                } else if (DD < 3) {
                                    return 'J';
                                } else if (fleet.isFaster()) {
                                    return 'P';
                                } else if (CAs > 2 || f_speed === '低速艦隊') {
                                    return 'J';
                                } else if (fleet.isInclude('足柄')) {
                                    return 'P';
                                } else {
                                    return 'K';
                                }
                            } else if (Ds < 3 || CAs > 2) {
                                return 'J';
                            } else {
                                return 'I';
                            }
                            break;
                        case 'I':
                            if (BBCVs > 0 || CAs > 2 || Ds === 0) {
                                return 'J';
                            } else if (fleet.isInclude('羽黒') && fleet.isInclude('神風')) {
                                if (Ds > 2) {
                                    if (fleet.isFaster()) {
                                        return 'J';
                                    } else {
                                        return 'M';
                                    }
                                } else if (Ds === 2) {
                                    if (f_speed === '最速艦隊') {
                                        return 'M';
                                    } else {
                                        return 'L';
                                    }
                                } else if (Ds === 1) {
                                    return 'L';
                                } // Dsより例外なし
                            } else if (f_speed === '最速艦隊' && DD > 2) {
                                return 'J';
                            } else if ((fleet.isInclude('羽黒') || fleet.isInclude('神風')) && fleet.isInclude('足柄') && Ds > 2) {
                                return 'M';
                            } else {
                                return 'L';
                            }
                            break;
                        case 'J':
                            if (BBCVs > 0 || f_speed === '低速艦隊' || CAs > 3) {
                                return 'M';
                            } else if (DD > 2) {
                                if ((fleet.isInclude('羽黒') && fleet.isInclude('足柄')) || (fleet.isInclude('羽黒') && fleet.isInclude('神風'))) {
                                    return 'P';
                                } else {
                                    return 'M';
                                }
                            } else if (DD === 2) {
                                if (fleet.isInclude('羽黒') && fleet.isInclude('神風') && fleet.isInclude('足柄')) {
                                    return 'P';
                                } else {
                                    return 'M';
                                }
                            } else if (DD === 1) {
                                return 'M';
                            } else { // wikiに記載なし
                                return 'M';
                            }
                            break;
                        case 'M':
                            if (CV + CVB > 0 || BBCVs > 1 || Ss > 3) {
                                return 'N';
                            } else if (fleet.countSBB() > 0 || AO > 0 || AV > 1) {
                                return 'O';
                            } else {
                                return 'P';
                            }
                            break;
                    }
                }
                break;
            case '7-4':
                switch (node) {
                    case null:
                        return '1';
                    case '1':
                        if (BB + CV + CVB + Ss > 0 || CAs > 1 || CL + CT + CLT > 1) {
                            return 'C';
                        } else if (fleet.isInclude('あきつ丸') && DE >= 2 && (DD > 0 || DE > 3)) {
                            return 'A';
                        } else if (BBV + CVL + fleet.countShip('あきつ丸') > 2) {
                            return 'C';
                        } else if (Ds > 2 || DE > 1) {
                            return 'A';
                        } else {
                            return 'C';
                        }
                        break;
                    case 'C':
                        if (BB + CV + CVB + Ss > 0 || CVL + fleet.countShip('あきつ丸') > 2) {
                            return 'D';
                        } else if (Ds > 3 || (CT > 0 && Ds > 2) || DE > 2 || (fleet.isFaster() && DD > 1)) {
                            return 'E';
                        } else {
                            return 'D';
                        }
                        break;
                    case 'E':
                        if (AO + LHA > 0 && DE > 3 && fleet.countTaiyo() + AO + LHA + DD + DE === 6) {
                            return 'G';
                        } else {
                            return 'J';
                        }
                        break;
                    case 'F':
                        if (option.F === 'H') {
                            return 'H';
                        } else {
                            return 'J';
                        }
                        break;
                    case 'G': // 索敵で分岐するようだが不明 とりあえず素通りで実装
                        return 'L';
                    case 'J': // ややこひ～
                        if (track.includes('D')) {
                            return 'K';
                        } else if (track.includes('E')) {
                            if (f_seek[3] < 33) {
                                return 'K';
                            } else if (f_seek[3] < 37 && f_seek[3] >= 33) {
                                if (CT > 0 && DE > 2 && fleet.countTaiyo() + CT + Ds === 5 && f_length === 5) {
                                    return [
                                        { node: 'K', rate: 0.5 },
                                        { node: 'P', rate: 0.5 },
                                    ];
                                } else {
                                    return [
                                        { node: 'K', rate: 0.5 },
                                        { node: 'L', rate: 0.5 },
                                    ];
                                }
                                
                            } else if (f_seek[3] >= 37) {
                                return 'L';
                            } // LoSより例外なし
                        } // DかEどっちかは通る
                        break;
                    case 'K': // KtoPは見つかってないらしい 全てMへ
                        return 'M';
                    case 'M': // 🤮
                        const flag =
                            (fleet.countSBB() > 0 && CV + CVB > 0)
                            || (BBs - fleet.countSBB() > 1)
                            || (BBV > 1)
                            || (CVL + fleet.countShip('あきつ丸') > 1)
                            || (BBs - fleet.countSBB() + BBV + CVL + fleet.countShip('あきつ丸') > 2)
                            || (Ds < 2);
                        if (f_seek[3] < 45) {
                            return 'N';
                        } if (flag && f_seek[3] < 47 && f_seek[3] >= 45) {
                            return [
                                { node: 'N', rate: 0.5 },
                                { node: 'O', rate: 0.5 },
                            ];
                        } else if (flag && f_seek[3] >= 47) {
                            return 'O';
                        } else {
                            return 'P';
                        }
                        break;
                }
                break;
            case '7-5':
                switch (node) {
                    case null:
                        return '1';
                    case 'B':
                        if (fleet.isFaster()) {
                            return 'D';
                        } else if (CV + CVB > 1 || fleet.countSBB() > 1 || Ss > 0 || CL === 0 || Ds < 2) {
                            return 'C';
                        } else if (Ds > 2) {
                            return 'D';
                        } else if (CV + CVB > 0 || CVL > 1 || BBs > 2 || CAs > 2) {
                            return 'C';
                        } else {
                            return 'D';
                        }
                        break;
                    case 'D':
                        if (f_speed === '最速艦隊') {
                            return 'F';
                        } else if (CV + CVB > 1) {
                            return 'E';
                        } else if (CVL > 2) {
                            return 'E';
                        } else if (BBs + CV + CVB + CAs > 2) {
                            return 'E';
                        } else if (CL + DD === 0) {
                            return 'E';
                        } else if (f_speed === '高速+艦隊') {
                            return 'F';
                        } else if (Ds > 2) {
                            return 'F';
                        } else if (BBs < 2) {
                            return 'F';
                        } else if (Ds < 2) {
                            return 'E';
                        } if (f_speed === '低速艦隊') {
                            return 'E';
                        } else {
                            return 'F';
                        }
                        break;
                    case 'F':
                        if (option.F === 'G') {
                            return 'G';
                        } else {
                            return 'J';
                        }
                        break;
                    case 'H':
                        if (option.H === 'I') {
                            return 'I';
                        } else {
                            return 'K';
                        }
                        break;
                    case 'I':
                        if (f_seek[3] < 53) {
                            return 'L';
                        } else if (f_seek[3] < 59 && f_seek[3] >= 53) {
                            return [
                                { node: 'L', rate: 0.5 },
                                { node: 'M', rate: 0.5 },
                            ];
                        } else if (f_seek[3] >= 59) {
                            return 'M';
                        } // LoSより例外なし
                        break;
                    case 'J':
                        if ((CVL === 1 && CAs === 2 && CL === 1 && Ds === 2) || fleet.isFaster()) {
                            return 'O';
                        } else if (CV + CVB > 0 || CVL > 2 || fleet.countSBB() > 1 || BBs + CAs > 2 || Ds < 2) {
                            return 'N';
                        } else if (Ds > 2 || f_speed !== '低速艦隊') {
                            return 'O';
                        } else {
                            return 'N';
                        }
                        break;
                    case 'O':
                        if (option.O === 'P') {
                            return 'P';
                        } else {
                            return 'Q';
                        }
                        break;
                    case 'P': // 🤧
                        if (f_seek[3] < 58) {
                            return 'S';
                        } else if (f_seek[3] < 63 && f_seek[3] >= 58) {
                            if (f_speed === '最速艦隊') {
                                return [
                                    { node: 'S', rate: 0.333 },
                                    { node: 'T', rate: 0.667 },
                                ];
                            } else if (CV > 0 || BBs + CVL > 1 || BBs + CAs > 2 || CL === 0) {
                                return [
                                    { node: 'R', rate: 0.667 },
                                    { node: 'S', rate: 0.333 },
                                ];
                            } else {
                                return [
                                    { node: 'S', rate: 0.333 },
                                    { node: 'T', rate: 0.667 },
                                ];
                            }
                        } else if (f_seek[3] >= 63) {
                            if (f_speed === '最速艦隊') {
                                return 'T';
                            } else if (CV > 0 || BBs + CVL > 1 || BBs + CAs > 2 || CL === 0) {
                                return 'R';
                            } else {
                                return 'T';
                            }
                        } // LoSより例外なし
                        break;
                }
                break;
            case '57-7':
                switch (node) {
                    case null:
                        switch (option.phase) {
                            case '1':
                            case '2':
                                return '1';
                            case '3':
                                if (f_type === '空母機動部隊') {
                                    return '2';
                                } else {
                                    return '1';
                                }
                            case '4':
                            case '5':
                            case '6':
                            case '7':
                                if (f_type === '通常艦隊') {
                                    return '1';
                                } else if (f_type === '水上打撃部隊' && BBs > 3) {
                                    return '1';
                                } else if (f_type === '輸送護衛部隊') {
                                    return '3';
                                } else {
                                    return '2';
                                }
                        }
                        break;
                    case '1':
                        if (!fleet.isUnion()) {
                            return 'A';
                        } else { // f_type !== 通常艦隊
                            return 'C';
                        }
                        break;
                    case 'A':
                        if (CV + CVB > 0) {
                            return 'A1';
                        } else if (CL === 0) {
                            return 'A1';
                        } else if (Ds < 2) {
                            return 'A1';
                        } else if (Ds < 4 && f_speed === '低速艦隊') {
                            return 'A1';
                        } else {
                            return 'A2';
                        }
                        break;
                    case 'A1':
                        if (CL > 0 && DD > 3) {
                            return 'A2';
                        } else if (BBs > 1) {
                            return 'A2';
                        } else {
                            return 'B';
                        }
                        break;
                    case 'A3':
                        if (!fleet.isUnion()) {
                            return 'A4';
                        } else { // f_type !== 通常艦隊
                            return 'A5';
                        }
                        break;
                    case 'B':
                        if (f_seek[3] >= 88) {
                            return 'B2';
                        } else {
                            return 'B1';
                        }
                        break;
                    case 'C2':
                        if (Number(option.phase) >= 5
                            && fleet.isInclude(['明石改','秋津洲改','速吸改','神威改母','山汐丸改','宗谷'])
                            && f_speed !== '低速艦隊'
                        ) {
                            return 'L';
                        } else if (Number(option.phase) >= 5 && CV + CVB < 3) {
                            return 'D';
                        } else {
                            return 'C3';
                        }
                        break;
                    case 'D':
                        if (f_speed !== '低速艦隊') {
                            return 'F';
                        } else if (BBs + CV + CVB > 5) {
                            return 'E';
                        } else if (DD > 3) {
                            return 'F';
                        } else {
                            return 'E';
                        }
                        break;
                    case 'F':
                        if (Number(option.phase) >= 2) {
                            return 'G';
                        } else if (f_speed === '低速艦隊') {
                            return 'G';
                        } else {
                            return 'H';
                        }
                        break;
                    case 'K':
                        if (Ss > 0) {
                            return 'M';
                        } else if (f_speed === '低速艦隊') {
                            return 'M';
                        } else {
                            return 'N';
                        }
                        break;
                    case 'L':
                        if (BBCVs > 6) {
                            return 'N';
                        } else if (BBCVs > 5 && f_speed === '低速艦隊') {
                            return 'N';
                        } else if (Ds < 4 && f_speed === '低速艦隊') {
                            return 'T';
                        } else if (option.phase === '7') {
                            if (f_speed === '最速艦隊') {
                                return 'X';
                            } else if (DD > 7 && f_speed !== '低速艦隊') {
                                return 'X';
                            } else if (fleet.countYamatoClass() < 2
                                && fleet.isFaster()) {
                                return 'V';
                            } else if (fleet.countYamatoClass() < 2
                                && BBs + CV + CVB < 5
                                && CV + CVB < 3
                                && CL + DD > 4
                                && f_speed !== '低速艦隊'
                            ) {
                                return 'V';
                            } else {
                                return 'U';
                            }
                        } else if (Number(option.phase) >= 6 && BBs + CV < 5 && CL > 1) {
                            return 'U';
                        } else {
                            return 'T';
                        }
                        break;
                    case 'N':
                        if (scanner.route.includes('K')) {
                            return 'O';
                        } else if (scanner.route.includes('Q')) {
                            return 'O';
                        } else if (scanner.route.includes('L')) {
                            return 'T';
                        } // どれかは経由するので例外なし
                        break;
                    case 'O':
                        if (Number(option.phase) < 4) {
                            return 'P';
                        } else if (f_type === '空母機動部隊' || f_type === '水上打撃部隊') {
                            return 'P';
                        } else { // f_type === '輸送護衛部隊' // 通常艦隊がくるかは分からない
                            return 'R';
                        }
                        break;
                    case 'Q':
                        if (BBV + CVL + CAs > 3) {
                            return 'N';
                        } else {
                            return 'O';
                        }
                        break;
                    case 'U':
                        if (BBs > 4) {
                            return 'V';
                        } else {
                            return 'X';
                        }
                        break;
                    case 'X':
                        if (Number(option.phase) < 6) {
                            return 'W';
                        } else if (fleet.isInclude(['明石改', '秋津洲改', '速吸改', '神威改母', '山汐丸改', '宗谷'])) {
                            return 'Y';
                        } else {
                            return 'Z';
                        }
                        break;
                    case 'A2':
                        if (option.A2 === 'B') {
                            return 'B';
                        } else {
                            return 'A3';
                        }
                        break;
                    case 'B2':
                        if (option.B2 === 'B3') {
                            return 'B3';
                        } else {
                            return 'B4';
                        }
                        break;
                    case 'C':
                        if (option.C === 'A3') {
                            return 'A3';
                        } else {
                            return 'C1';
                        }
                        break;
                    case 'J':
                        if (option.J === 'K') {
                            return 'K';
                        } else {
                            return 'L';
                        }
                        break;
                }
                break;
            case '58-1':
                switch (node) {
                    case null:
                        if (option.phase === 'A') {
                            return '1';
                        } else if (fleet.countAktmrPlusCVs() === 0 && Ds > 3) {
                            return '2';
                        } else if (fleet.countAktmrPlusCVs() > 0 && fleet.countNotEquipArctic() > 0) {
                            return '2';
                        } else if (AO + LHA > 0 && Ds > 2) {
                            return '2';
                        } else if (AV > 1 && Ds > 2) {
                            return '2';
                        } else if (option.phase === '3' && fleet.countAktmrPlusCVs() > 0) {
                            return '3';
                        } else if (fleet.countAktmrPlusCVs() > 2) {
                            return '1';
                        } else if (BBs > 0) {
                            return '1';
                        } else if (Ss > 0 && AS === 0) {
                            return '2';
                        } else if (AS > 1) {
                            return '2';
                        } else if (option.phase === '3' && CA > 1 && Ds > 1 && CL + CT > 0) {
                            return '3';
                        } else if (fleet.countAktmrPlusCVs() > 0 && Ds > 2) {
                            return '2';
                        } else {
                            return '1';
                        }
                        break;
                    case '2':
                        if (AV > 0) {
                            return 'I';
                        } else if (fleet.isFaster()) {
                            return 'N';
                        } else if (AO + LHA === 2 && AO + LHA + Ds === 6) {
                            return 'N';
                        } else if (AO + LHA === 1 && AO + LHA + Ds === f_length && f_length < 6) {
                            return 'N';
                        } else {
                            return 'I';
                        }
                        break;
                    case 'B':
                        if (Number(option.phase) < 3) {
                            return 'C';
                        } else if (CL > 0 && DD > 2 && f_speed === '高速艦隊') {
                            return 'W';
                        } else {
                            return 'C';
                        }
                        break;
                    case 'D':
                        if (track.includes('1')) {
                            return 'E';
                        } else if (track.includes('2')) {
                            if (CVs > 2) {
                                return 'J';
                            } else if (DD < 2) {
                                return 'J';
                            } else if (f_speed === '低速艦隊') {
                                return 'J';
                            } else {
                                return 'K';
                            }
                        }
                        break;
                    case 'K':
                        if (f_seek[3] >= 68) {
                            return 'M';
                        } else {
                            return 'L';
                        }
                        break;
                    case 'R':
                        if (BBs < 3 && CL + AV > 0 && DD > 1 && f_speed !== '低速艦隊') {
                            return 'R2';
                        } else {
                            return 'R1';
                        }
                        break;
                    case 'R2':
                        if (DD > 4) {
                            return 'T';
                        } else if (CL > 0 && DD > 3 && f_speed !== '低速艦隊') {
                            return 'T';
                        } else {
                            return 'S';
                        }
                        break;
                    case 'S':
                        if (f_seek[3] >= 80) {
                            return 'T';
                        } else {
                            return 'U';
                        }
                        break;
                    case 'W':
                        if (CA > 1 && DD > 1) {
                            return 'R2';
                        } else if (f_speed === '低速艦隊') {
                            return 'R';
                        } else if (BBs > 0 && CV + CVB > 1 && CL === 0) {
                            return 'R';
                        } else if (DD > 2) {
                            return 'R2';
                        } else if (DD < 2) {
                            return 'R';
                        } else if (CL === 0) {
                            return 'R';
                        } else if (CV + CVB > 2) {
                            return 'R2';
                        } else if (CV + CVB < 2) {
                            return 'R2';
                        } else if (BBs === 0) {
                            return 'R2';
                        } else if (f_seek[3] >= 100) {
                            return 'R2';
                        } else {
                            return 'R';
                        }
                        break;
                    case 'A':
                        if (option.A === 'B') {
                            return 'B';
                        } else {
                            return 'D';
                        }
                        break;
                    case 'I':
                        if (option.I === 'D') {
                            return 'D';
                        } else {
                            return 'N1';
                        }
                        break;
                    case 'F':
                        if (option.F === 'G') {
                            return 'G';
                        } else {
                            return 'H';
                        }
                }
                break;
            case '58-2':
                switch (node) {
                    case null:
                        if (option.phase === '1') {
                            return '1';
                        } else if (option.phase === '2') {
                            if (fleet.isUnion()) {
                                return '2';
                            } else {
                                return '1';
                            }
                        } else if (option.phase === '3') {
                            if (fleet.isUnion()) {
                                return '2';
                            } else {
                                if (BBs > 0) {
                                    return '1';
                                } else if (fleet.countAktmrPlusCVs() > 0) {
                                    return '1';
                                } else if (option.difficulty === '4' && Ss < 3) {
                                    return '1';
                                } else if (option.difficulty === '3' && Ss < 2) {
                                    return '1';
                                } else if (Number(option.difficulty) < 3 && Ss === 0) {
                                    return '1';
                                } else {
                                    return '3';
                                }
                            }
                        }
                        break;
                    case 'C':
                        if (track.includes('1')) {
                            if (f_speed === '低速艦隊') {
                                return 'F';
                            } else if (CV + CVB > 0) {
                                return 'F';
                            } else {
                                return 'D';
                            }
                        } else if (track.includes('3')) {
                            return 'I';
                        }
                        break;
                    case 'D':
                        if (!fleet.isUnion()) {
                            if (f_seek[3] >= 98) {
                                return 'D2';
                            } else {
                                return 'D1';
                            }
                        } else {
                            return 'N';
                        }
                        break;
                    case 'E':
                        if (CV + CVB > 0) {
                            return 'F';
                        } else if (f_speed === '高速艦隊') {
                            return 'G';
                        } else if (BBs > 1) {
                            return 'F';
                        } else if (CL > 0 && Ds > 1) {
                            return 'G';
                        } else {
                            return 'F';
                        }
                        break;
                    case 'H':
                        if (track.includes('1')) {
                            if (f_seek[3] < 80) {
                                return 'K';
                            } else if (f_speed === '低速艦隊') {
                                return 'J';
                            } else if (BBs > 1) {
                                return 'J';
                            } else if (fleet.countShip('あきつ丸') + CVL > 1) {
                                return 'J';
                            } else {
                                return 'I';
                            }
                        } else if (track.includes('3')) {
                            return 'V';
                        }
                        break;
                    case 'I':
                        if (Ss > 0) {
                            return 'U';
                        } else {
                            return 'D3';
                        }
                        break;
                    case 'J':
                        if (!fleet.isUnion()) {
                            return 'P';
                        } else if (f_speed === '低速艦隊') {
                            return 'N';
                        } else if (BBs > 2) {
                            return 'N';
                        } else if (CVs > 2) {
                            return 'N';
                        } else if (CL > 1 && DD > 4) {
                            return 'P';
                        } else {
                            return 'N';
                        }
                        break;
                    case 'L':
                        if (f_type === '空母機動部隊') {
                            return 'M';
                        } else if (f_type === '水上打撃部隊') {
                            return 'D';
                        }
                        break;
                    case 'N':
                        if (CV + CVB > 0) {
                            return 'O';
                        } else if (CVL > 2) {
                            return 'O';
                        } else if (f_speed !== '低速艦隊') {
                            return 'P';
                        } else if (CL > 1 && DD > 2) {
                            return 'P';
                        } else {
                            return 'O';
                        }
                        break;
                    case 'P':
                        if (f_seek[1] >= 62) {
                            return 'R';
                        } else {
                            return 'Q';
                        }
                        break;
                    case 'T':
                        if (CAs > 1) {
                            return 'C';
                        } else if (CL > 1) {
                            return 'C';
                        } else {
                            return 'U';
                        }
                        break;
                    case 'U':
                        if (CAs > 0) {
                            return 'H';
                        } else if (CL > 1) {
                            return 'H';
                        } else if (option.difficulty === '1') {
                            return 'V';
                        } else if (AV > 0) {
                            return 'H';
                        } else if (AS > 0) {
                            return 'V';
                        } else {
                            return 'H';
                        }
                        break;
                    case 'V':
                        if (CAs + AV > 1) {
                            return 'W';
                        } else if (option.difficulty === '4' && Ss > 3) {
                            return 'X';
                        } else if (option.difficulty === '3' && Ss > 2) {
                            return 'X';
                        } else if (option.difficulty === '2' && Ss > 1) {
                            return 'X';
                        } else if (option.difficulty === '1') {
                            return 'X';
                        } else {
                            return 'W';
                        }
                        break;
                    case 'B':
                        if (option.B === 'C') {
                            return 'C';
                        } else {
                            return 'E';
                        }
                        break;
                }
                break;
            case '58-3':
                switch (node) {
                    case null:
                        if (fleet.isUnion()) {
                            return '1';
                        } else {
                            if (option.phase === '1') {
                                return '2';
                            } else { // Number(option.phase) > 1
                                if (AO > 0) {
                                    return '3';
                                } else if (CL > 0 && DD > 2 && f_speed !== '低速艦隊') {
                                    return '3';
                                } else if (fleet.countAktmrPlusCVs() > 0) {
                                    return '2';
                                } else if (BBs > 0) {
                                    return '2';
                                } else if (AO + LHA + AV > 1) {
                                    return '2';
                                } else if (Number(option.phase) < 3) {
                                    return '3';
                                } else { // option.phase === '3'
                                    if (option.difficulty === '4' && AS > 0 && Ss > 2) {
                                        return '4';
                                    } if (option.difficulty === '3' && Ss > 2) {
                                        return '4';
                                    } if (option.difficulty === '2' && Ss > 1) {
                                        return '4';
                                    } if (option.difficulty === '1' && Ss > 0) {
                                        return '4';
                                    } if (option.difficulty === '1' && Ds > 2) {
                                        return '4';
                                    } else {
                                        return '2';
                                    }
                                }
                            }
                        }
                        break;
                    case 'B':
                        if (BBCVs > 5) {
                            return 'C';
                        } else if (f_speed !== '低速艦隊') {
                            return 'D';
                        } else if (CL > 1 && Ds > 3) {
                            return 'D';
                        } else {
                            return 'C';
                        }
                        break;
                    case 'D':
                        if (BBCVs > 6) {
                            return 'E';
                        } else if (BBs > 3) {
                            return 'E';
                        } else if (CV + CVB > 2) {
                            return 'E';
                        } else {
                            return 'F';
                        }
                        break;
                    case 'F':
                        if (f_seek[1] >= 65) {
                            return 'O';
                        } else {
                            return 'G';
                        }
                        break;
                    case 'H':
                        if (CL > 0 && DD > 3 && f_speed !== '低速艦隊') {
                            return 'J';
                        } else {
                            return 'I';
                        }
                        break;
                    case 'I':
                        if (BBCVs > 4) {
                            return 'L';
                        } else if (Ds < 2) {
                            return 'L';
                        } else if (f_speed !== '低速艦隊') {
                            return 'M';
                        } else if (BBs > 1) {
                            return 'L';
                        } else if (Ds > 1) {
                            return 'L';
                        } else {
                            return 'M';
                        }
                        break;
                    case 'J':
                        return 'N';
                    case 'L':
                        return 'M';
                    case 'O':
                        if (f_seek[1] < 75) {
                            return 'O1';
                        } else if (BBs < 3) {
                            return 'O3';
                        } else if (CL > 1) {
                            return 'O3';
                        } else {
                            return 'O2';
                        }
                        break;
                    case 'P':
                        if (f_seek[3] >= 98) {
                            return 'R';
                        } else {
                            return 'Q';
                        }
                        break;
                    case 'R':
                        if (fleet.isFaster()) {
                            return 'U';
                        } else {
                            return 'S';
                        }
                        break;
                    case 'S':
                        if (f_speed === '低速艦隊') {
                            return 'T';
                        } else {
                            return 'U';
                        }
                        break;
                    case 'W':
                        if (AV + LHA > 0) {
                            return 'X';
                        } else if (option.difficulty === '4' && AS > 0 && Ss > 3) {
                            return 'Y';
                        } else if (option.difficulty === '4' && DD > 1) {
                            return 'Y';
                        } else if (Number(option.difficulty) < 4) {
                            return 'Y';
                        } else {
                            return 'X';
                        }
                        break;
                    case 'Y':
                        if (CAs + CL + CT + CLT + AV + LHA > 2) {
                            return 'Y1';
                        } else if (CAs + AV === 2) {
                            return 'Y1';
                        } else if (DD > 0) {
                            return 'Y2';
                        } else if (Ss > 4) {
                            return 'Y2';
                        } else if (CAs + CL + CT + CLT + AV + LHA === 2) {
                            return 'Y1';
                        } else if (Ss < 4) {
                            return 'Y1';
                        } else {
                            return 'Y2';
                        }
                        break;
                    case 'M':
                        if (option.M === 'P') {
                            return 'P';
                        } else {
                            return 'N';
                        }
                        break;
                }
                break;
            case '58-4':
                switch (node) {
                    case null:
                        if (option.phase === '1') {
                            return '1';
                        } else if (Number(option.phase) > 1) {
                            if (!fleet.isUnion()) {
                                return '1';
                            } else if (f_type === '輸送護衛部隊') {
                                return '2';
                            } else if (f_type === '水上打撃部隊') {
                                if (BBV + CAV === 2 && CL === 1 && BBV + CL + Ds + AO + AS + LHA === 12) {
                                    return '2';
                                } else if (((BBV + CAV === 1) || (BBV + CAV === 2)) && CL + CT === 2 && BBV + CAV + CL + CT + Ds + AO + AS + LHA === 12) {
                                    return '2';
                                } else if (Number(option.phase) < 3) {
                                    return '1';
                                } else if (option.phase === '3') {
                                    return '3';
                                }
                            } else if (f_type === '空母機動部隊') {
                                return '1';
                            }
                        }
                        break;
                    case '1':
                        if (Number(option.phase) < 2 && Ss > 0) {
                            return 'A1';
                        } else if (CV + CVB > 3) {
                            return 'A';
                        } else if (fleet.countYamatoClass() > 1 && f_speed === '低速艦隊') {
                            return 'A';
                        } else if (Number(option.phase) > 1 && option.tag === '1') {
                            return 'P';
                        } else if (AS + Ss > 0) {
                            return 'A1';
                        } else if (fleet.isUnion()) {
                            return 'A1';
                        } else if (option.difficulty === '1') {
                            return 'A1';
                        } else { // Number(option.diffculty) > 1
                            return 'A';
                        }
                        break;
                    case '3':
                        if (f_speed === '高速艦隊') {
                            return 'T';
                        } else if (Ds > 4) {
                            return 'T';
                        } else if (CVs > 2) {
                            return 'F';
                        } else if (fleet.countYamatoClass() === 1) {
                            return 'F';
                        } else {
                            return 'T';
                        }
                        break;
                    case 'A':
                        if (!fleet.isUnion()) {
                            return 'A1';
                        } else if (CV + CVB > 3) {
                            return 'A1';
                        } else if (Ds > 3) {
                            return 'B';
                        } else {
                            return 'A1';
                        }
                        break;
                    case 'A1':
                        if (!fleet.isUnion()) {
                            return 'A2';
                        } else {
                            return 'B';
                        }
                        break;
                    case 'C':
                        if (AV > 1) {
                            return 'C2';
                        } else if (f_speed !== '低速艦隊') {
                            return 'C1';
                        } else if (CVs > 3) {
                            return 'C2';
                        } else if (CAs > 2) {
                            return 'C2';
                        } else {
                            return 'C1';
                        }
                        break;
                    case 'D':
                        if (BB > 0) {
                            return 'D2';
                        } else if (CL + CT > 2) {
                            return 'D1';
                        } else if (CVL > 0 && Ds > 3) {
                            return 'D1';
                        } else if (CVL === 0 && BBV === 0 && CL + CT > 1 && f_speed === '低速艦隊') {
                            return 'D1';
                        } else if (CVL === 0 && CL + CT === 2 && Ds > 3) {
                            return 'D1';
                        } else {
                            return 'D2';
                        }
                        break;
                    case 'E':
                        if (fleet.countYamatoClass() === 2 && DD < 5) {
                            return 'F';
                        } else if (fleet.countYamatoClass() === 1 && DD < 4) {
                            return 'F';
                        } else if (fleet.countYamatoClass() === 0 && DD < 3) {
                            return 'F';
                        } else if (BBCVs < 5) {
                            return 'F1';
                        } else if (f_speed === '低速艦隊') {
                            return 'F';
                        } else if (BBCVs === 5) {
                            return 'F1';
                        } else if (CL > 1) {
                            return 'F1';
                        } else {
                            return 'F';
                        }
                        break;
                    case 'F':
                        if (!fleet.isUnion()) {
                            return 'J1';
                        } else if (f_type === '輸送護衛部隊') {
                            return 'J1';
                        } else if (track.includes('P')) {
                            return 'J1';
                        } else if (track.includes('1')) {
                            return 'F1';
                        } else if (track.includes('2')) {
                            return 'J1';
                        } else if (track.includes('3')) {
                            return 'U';
                        }
                        break;
                    case 'F1':
                        return 'G';
                    case 'H':
                        if (f_speed === '低速艦隊') {
                            return 'I';
                        } else {
                            return 'J';
                        }
                        break;
                    case 'I1':
                        if (DD > 7) {
                            return 'I3';
                        } else {
                            return 'I2';
                        }
                        break;
                    case 'J':
                        if (option.phase === '1') {
                            return 'J1';
                        } else if (BBs + fleet.countAktmrPlusCVs() > 0) {
                            return 'F';
                        } else if (option.difficulty === '4' && Ss > 3 && CAs < 2) {
                            return 'J1';
                        } else if (Number(option.difficulty) < 4 && Ss > 2) {
                            return 'J1';
                        } else {
                            return 'F';
                        }
                        break;
                    case 'J1':
                        if (fleet.isUnion()) {
                            return 'J2';
                        } else if (BBs + fleet.countAktmrPlusCVs() > 0) {
                            return 'Q';
                        } else if (CL === 1 && DD === 2 && AS === 1 && Ss === 3) {
                            return 'R';
                        } else if (option.diffculty === '1' && CL > 0 && DD > 2) {
                            return 'R';
                        } else if (AS === 0) {
                            return 'Q';
                        } else if (CAs + CL + CT + CLT > 0) {
                            return 'Q';
                        } else if (AV > 1) {
                            return 'Q';
                        } else if (DD > 2) {
                            return 'Q';
                        } else if (Ss > 3) {
                            return 'R';
                        } else if (AV === 0) {
                            return 'R';
                        } else {
                            return 'Q';
                        }
                        break;
                    case 'J2':
                        if (track.includes('2')) {
                            if (DD > 7) {
                                return 'M';
                            } else {
                                return 'L';
                            }
                        } else if (track.includes('3')) {
                            if ( CVs > 2) {
                                return 'L';
                            } else {
                                return 'V';
                            }
                        }
                        break;
                    case 'L':
                        return 'M';
                    case 'M':
                        if (f_seek[1] >= 52) {
                            return 'O';
                        } else {
                            return 'N';
                        }
                        break;
                    case 'U':
                        if (BBs < 4 && CV + CVB === 0 && CVL < 2 && CL > 1 && Ds > 3) {
                            return 'V';
                        } else if (fleet.countYamatoClass() < 2 && CV + CVB < 2 && DD > 3 && f_speed !== '低速艦隊') {
                            return 'V';
                        } else if (fleet.countYamatoClass() < 2 && CL > 1 && f_speed !== '低速艦隊') {
                            return 'V';
                        } else {
                            return 'J2';
                        }
                        break;
                    case 'V':
                        if (fleet.isInclude(['明石改', '朝日改', '秋津洲改'])) {
                            return 'W';
                        } else {
                            return 'X';
                        }
                        break;
                    case 'X':
                        if (f_seek[1] >= 84) {
                            return 'Z';
                        } else {
                            return 'Y';
                        }
                        break;
                    case 'B':
                        if (option.B === 'C') {
                            return 'C';
                        } else {
                            return 'D';
                        }
                        break;
                }
                break;
            case '59-1':
                switch (node) {
                    case null:
                        if (option.phase === '1') {
                            return '1';
                        } else if (CV + CVB > 0) {
                            return '1';
                        } else if (BBs + CVL > 3) {
                            return '1';
                        } else if (BBs > 2) {
                            return '1';
                        } else if (AO > 0) {
                            return '1';
                        } else if (CL + AV > 2) {
                            return '1';
                        } else if (BBs > 0 && CL > 0 && AV > 0) {
                            return '1';
                        } else {
                            return '2';
                        }
                        break;
                    case '2':
                        if (LHA > 0) {
                            return 'I';
                        } else if (fleet.isFaster()) {
                            return 'J';
                        } else if (Ss > 0) {
                            return 'I';
                        } else if (CVL > 1) {
                            return 'I';
                        } else if (CAs > 2) {
                            return 'I';
                        } else if (Ds < 2) {
                            return 'I';
                        } else if (f_speed !== '低速艦隊') {
                            return 'J';
                        } else if (BBs > 1) {
                            return 'I';
                        } else if (CL + CT === 0) {
                            return 'I';
                        } else {
                            return 'J';
                        }
                        break;
                    case 'A':
                        if (Ds === 0) {
                            return 'B';
                        } else if (AO > 0) {
                            return 'D';
                        } else if (Ds === 1) {
                            if (Ss > 0) {
                                return 'C1';
                            } else if (BBCVs > 2) {
                                return 'C1';
                            } else {
                                return 'D';
                            }
                        } else if (Ds > 1) {
                            if (Ss > 0 && f_speed === '低速艦隊') {
                                return 'C1';
                            } else if (CVs > 2 && CL + CT === 0) {
                                return 'B';
                            } else if (BBCVs === 4) {
                                return 'B';
                            } else if (BBCVs === 3) {
                                return 'D';
                            } else if (BBCVs === 2 && CL + CT + AV === 0) {
                                return 'D';
                            } else if (BBCVs < 2 && CL + CT === 0) {
                                return 'D';
                            } else {
                                return 'B';
                            }
                        }
                        break;
                    case 'C1':
                        if (BBs + CV + CVB + Ss > 1) {
                            return 'D';
                        } else if (CVs > 2) {
                            return 'D';
                        } else if (Ss > 0 && Ds < 5) {
                            return 'D';
                        } else if (Ds < 2) {
                            return 'D';
                        } else {
                            return 'E';
                        }
                        break;
                    case 'C2':
                        if (BBs < 2 && CV + CVB === 0 && CVL < 2 && Ds > 1 && f_speed !== '低速艦隊') {
                            return 'L';
                        } else {
                            return 'C1';
                        }
                        break;
                    case 'G':
                        if (track.includes('1')) {
                            return 'H';
                        } else if (Number(option.phase) < 3) {
                            return 'K';
                        } else if (BBCVs > 1) {
                            return 'K';
                        } else if (Ds > 4) {
                            return 'L';
                        } else if (f_speed === '低速艦隊') {
                            return 'K';
                        } else if (Ds === 4) {
                            return 'L';
                        } else if (Ds === 3 && CL > 0 && BBCVs === 0) {
                            return 'L';
                        } else {
                            return 'K';
                        }
                        break;
                    case 'C':
                        if (option.C === 'C1') {
                            return 'C1';
                        } else {
                            return 'C2';
                        }
                        break;
                    case 'E':
                        if (option.E === 'F') {
                            return 'F';
                        } else {
                            return 'G';
                        }
                        break;
                }
                break;
            case '59-2':
                switch (node) {
                    case null:
                        if (!fleet.isUnion()) {
                            return 'A';
                        } else {
                            return 'F';
                        }
                        break;
                    case 'A':
                        if (fleet.isFaster()) {
                            return 'A2';
                        } else if (DD > 3) {
                            return 'A2';
                        } else if (DD > 2 && f_speed !== '低速艦隊') {
                            return 'A2';
                        } else {
                            return 'A1';
                        }
                        break;
                    case 'C':
                        if (f_seek[3] >= 60) {
                            return 'E';
                        } else {
                            return 'D';
                        }
                        break;
                    case 'G':
                        if (f_type === '輸送護衛部隊') {
                            return 'I';
                        } else if (fleet.countAktmrPlusCVs() > 4) {
                            return 'H';
                        } else if (BBs > 3) {
                            return 'H';
                        } else if (CV + CVB > 2) {
                            return 'H';
                        } else if (Ds < 3) {
                            return 'H';
                        } else if (DD === 3) {
                            if (f_speed === '低速艦隊') {
                                return 'H';
                            } else if (LHA > 0) {
                                return 'I';
                            } else if (AV > 1) {
                                return 'I';
                            } else {
                                return 'K';
                            }
                        } else if (DD > 3) {
                            if (LHA > 0) {
                                return 'I';
                            } else if (AV > 1) {
                                return 'I';
                            } else if (BBs === 3 && CVs === 1 && CL + CT === 2) {
                                return 'I';
                            } else if (f_speed !== '低速艦隊') {
                                return 'K';
                            } else if (CV + CVB < 2 && CL + CT > 1) {
                                return 'K';
                            } else {
                                return 'H';
                            }
                        }
                        break;
                    case 'I':
                        if (CV + CVB > 1) {
                            return 'J';
                        } else if (Ds < 4) {
                            return 'J';
                        } else if (CL + CT < 2 && f_speed === '低速艦隊') {
                            return 'J';
                        } else if (Ds + LHA < 6 && f_speed === '低速艦隊') {
                            return 'J';
                        } else if (BBs < 2) {
                            return 'L';
                        } else if (fleet.countAktmrPlusCVs() < 2) {
                            return 'L';
                        } else {
                            return 'J';
                        }
                        break;
                    case 'R':
                        if (f_seek[1] >= 68) {
                            return 'W';
                        } else {
                            return 'V';
                        }
                        break;
                    case 'S':
                        if (f_seek[1] >= 59) {
                            return 'U';
                        } else {
                            return 'T';
                        }
                        break;
                    case 'L':
                        if (option.L === 'M') {
                            return 'M';
                        } else {
                            return 'N';
                        }
                        break;
                    case 'N':
                        if (option.N === 'O') {
                            return 'O';
                        } else {
                            return 'P';
                        }
                        break;
                    case 'P':
                        if (option.P === 'Q') {
                            return 'Q';
                        } else {
                            return 'R';
                        }
                        break;
                }
                break;
            case '59-3':
                switch (node) {
                    case null:
                        if (!fleet.isUnion() && f_length !== 7) {
                            return '1';
                        } else if (!fleet.isUnion() && f_length === 7) {
                            return '2';
                        } else if (f_type === '輸送護衛部隊') {
                            return '1';
                        } else if (option.phase === '1' && (f_type === '水上打撃部隊' || f_type === '空母機動部隊')) {
                            return '1';
                        } else if (Number(option.phase) > 1 && (f_type === '水上打撃部隊' || f_type === '空母機動部隊')) {
                            return '3';
                        }
                        break;
                    case '1':
                        if (!fleet.isUnion()) {
                            return 'A';
                        } else {
                            return 'L';
                        }
                        break;
                    case '2':
                        if (CV + CVB < 3 && Ds > 2) {
                            return 'H';
                        } else {
                            return 'G';
                        }
                        break;
                    case 'B':
                        if (CVs > 3) {
                            return 'B2';
                        } else if (CV + CVB > 2) {
                            return 'B2';
                        } else if (AV > 1) {
                            return 'B2';
                        } else if (LHA > 0) {
                            return 'B2';
                        } else if (BBs < 3 && Ds > 2) {
                            return 'C';
                        } else {
                            return 'B1';
                        }
                        break;
                    case 'B1':
                        if (!fleet.isUnion()) {
                            return 'C';
                        } else if (f_type === '輸送護衛部隊') {
                            return 'P';
                        } else if (f_type === '水上打撃部隊') {
                            return 'N';
                        } else if (f_type === '空母機動部隊') {
                            if (fleet.countAktmrPlusCVs() > 3) {
                                return 'N';
                            } else if (CV + CVB > 1) {
                                return 'N';
                            } else if (Ds < 2 && BBs > 3) {
                                return 'N';
                            } else {
                                return 'P';
                            }
                        } else { // 保険
                            return 'P';
                        }
                        break;
                    case 'C3':
                        if (f_seek[3] < 103) {
                            return 'E';
                        } else if (BBs + CV + CVB > 3) {
                            return 'D';
                        } else if (Ds < 2) {
                            return 'D';
                        } else {
                            return 'F';
                        }
                        break;
                    case 'H':
                        if (Ds > 3 && f_speed !== '低速艦隊') {
                            return 'H2';
                        } else if (CV + CVB > 1) {
                            return 'B2';
                        } else {
                            return 'H1';
                        }
                        break;
                    case 'I':
                        if (f_seek[3] >= 82) {
                            return 'K';
                        } else {
                            return 'J';
                        }
                        break;
                    case 'N':
                        if (f_type === '水上打撃部隊') {
                            return 'O';
                        } else if (f_type === '空母機動部隊') {
                            if (f_speed === '低速艦隊') {
                                return 'O';
                            } else {
                                return 'P';
                            }
                        } else { // 通常艦隊が来られないこともなさそう。保険
                            return 'P';
                        }
                        break;
                    case 'P':
                        if (track.includes('1')) {
                            return 'Q';
                        } else if (track.includes('3')) {
                            if (fleet.countYamatoClass() > 1) {
                                return 'T';
                            } else if (CV + CVB > 2) {
                                return 'T';
                            } else if (Ss > 0 && AS === 0) {
                                return 'T';
                            } else if (f_type === '水上打撃部隊' && f_speed === '低速艦隊') {
                                return 'T';
                            } else {
                                return 'U';
                            }
                        } // 2からは来られないので例外なし
                        break;
                    case 'Q':
                        if (f_seek[1] >= 53) {
                            return 'S';
                        } else {
                            return 'R';
                        }
                        break;
                    case 'V':
                        if (LHA > 0 && f_speed === '低速艦隊') {
                            return 'V1';
                        } else if (AV > 1 && f_speed === '低速艦隊') {
                            return 'V1';
                        } else if (BBs > 3 && f_speed === '低速艦隊') {
                            return 'V1';
                        } else if (BBs > 4) {
                            return 'V1';
                        } else if (BBCVs > 5) {
                            return 'V2';
                        } else if (BBs + CV + CVB > 4) {
                            return 'V2';
                        } else if (CV + CVB > 2) {
                            return 'V2';
                        } else if (Ss > 0 && AS === 0) {
                            return 'V2';
                        } else if (fleet.countYamatoClass() > 1 && f_speed === '低速艦隊') {
                            return 'V2';
                        } else if (Number(option.phase) < 3) {
                            return 'V3';
                        } else if (Ds < 4) {
                            return 'V3';
                        } else if (CL > 1 && CA > 1) {
                            return 'X';
                        } else if (f_speed !== '低速艦隊') {
                            return 'X';
                        } else {
                            return 'V3';
                        }
                        break;
                    case 'V3':
                        if (f_seek[1] >= 72) {
                            return 'X';
                        } else {
                            return 'W';
                        }
                        break;
                    case 'C':
                        if (option.C === 'C1') {
                            return 'C1';
                        } else {
                            return 'C2';
                        }
                        break;
                }
                break;
            case '59-4':
                switch (node) {
                    case null:
                        if (!fleet.isUnion()) {
                            return '1';
                        } else {
                            return '2';
                        }
                        break;
                    case '1':
                        if (Ss > 0) {
                            return 'A1';
                        } else if (f_speed !== '低速艦隊') {
                            if (BBs > 2) {
                                return 'A1';
                            } else if (Ds > 1) {
                                return 'A';
                            } else if (f_length < 5) {
                                return 'A';
                            } else {
                                return 'A1';
                            }
                        } else { // f_speed === '低速艦隊'
                            if (CVs > 1) {
                                return 'A1';
                            } else if (BBs > 0) {
                                return 'A1';
                            } else if (CL + CT > 0 && Ds > 1) {
                                return 'A';
                            } else if (f_length < 5) {
                                return 'A';
                            } else {
                                return 'A1';
                            }
                        }
                        break;
                    case 'C':
                        if (BBs + CV + CVB > 2) {
                            return 'I';
                        } else if (CV + CVB > 1) {
                            return 'I';
                        } else if (CVs > 2) {
                            return 'I';
                        } else if (Ds < 2) {
                            return 'I';
                        } else if (Number(option.phase) > 1 && BBs === 0) {
                            return 'M';
                        } else if (Number(option.phase) > 1 && f_length < 7 && BBs === 1 && CL > 0) {
                            return 'M';
                        } else {
                            return 'L';
                        }
                        break;
                    case 'F':
                        if (true) {
                            return 'F1';
                        } else {
                            return 'F2';
                        }
                        break;
                    case 'G':
                        if (true) {
                            return 'H';
                        } else {
                            return 'K';
                        }
                        break;
                    case 'I':
                        if (CV + CVB > 1) {
                            return 'J';
                        } else if (CL + CT === 0 && Ds < 3) {
                            return 'J';
                        } else if (true) {
                            return 'L';
                        } else {
                            return 'J';
                        }
                        break;
                    case 'J':
                        if (true) {
                            return 'L';
                        } else {
                            return 'K';
                        }
                        break;
                    case 'M':
                        if (CV + CVB > 0) {
                            return 'N';
                        } else if (CVL > 1) {
                            return 'N';
                        } else if (Ds > 3) {
                            return 'O';
                        } else if (CL + CT > 0 && Ds === 3) {
                            return 'O';
                        } else if (CL + CT > 0 && f_speed !== '低速艦隊') {
                            return 'O';
                        } else {
                            return 'N';
                        }
                        break;
                    case 'Q':
                        if (f_seek[3] >= 72) {
                            return 'S';
                        } else {
                            return 'R';
                        }
                        break;
                    case 'T':
                        if (fleet.isFaster()) {
                            return 'T2';
                        } else if (Ss > 0 && AS === 0) {
                            return 'T1';
                        } else if (BBs > 3) {
                            return 'T1';
                        } else if (CVs > 3) {
                            return 'T1';
                        } else if (CV + CVB > 2) {
                            return 'T1';
                        } else if (CL + CT + Ds < 4) {
                            return 'T1';
                        } else if (f_speed !== '低速艦隊') {
                            return 'T2';
                        } else if (BBs < 3 && CL + CT > 1 && Ds > 3) {
                            return 'T2';
                        } else {
                            return 'T1';
                        }
                        break;
                    case 'W':
                        if (f_seek[1] < 80) {
                            return 'X';
                        } else if (fleet.isFaster()) {
                            return 'Z';
                        } else if (fleet.countYamatoClass() > 0) {
                            return 'X';
                        } else if (BBs > 3) {
                            return 'X';
                        } else if (BBs > 2 && CVs > 2) {
                            return 'X';
                        } else {
                            return 'Z';
                        }
                        break;
                    case 'X':
                        if (f_seek[1] < 73) {
                            return 'K';
                        } else if (fleet.isFaster()) {
                            return 'Z';
                        } else if (fleet.countYamatoClass() > 1) {
                            return 'Y';
                        } else if (BBs > 4) {
                            return 'Y';
                        } else {
                            return 'Z';
                        }
                        break;
                    case 'A2':
                        if (option.A2 === 'B') {
                            return 'B';
                        } else {
                            return 'C';
                        }
                        break;
                    case 'D':
                        if (option.D === 'E') {
                            return 'E';
                        } else {
                            return 'F';
                        }
                        break;
                }
                break;
            case '59-5':
                switch (node) {
                    case null:
                        if (!fleet.isUnion()) {
                            return '1';
                        } else if (option.phase === '1' && fleet.isUnion()) {
                            return '2';
                        } else if (Number(option.phase) > 1) {
                            if (BBs + CV + CVB > 2) {
                                return '3';
                            } else if (CV + CVB > 1) {
                                return '3';
                            } else {
                                return '2';
                            }
                        }
                        break;
                    case '1':
                        if (f_speed === '最速艦隊') {
                            return 'A';
                        } else if (BBCVs > 1) {
                            return 'A1';
                        } else if (fleet.isFaster()) {
                            return 'A';
                        } else if (BBs + CV + CVB > 0) {
                            return 'A1';
                        } else if (f_speed !== '低速艦隊') {
                            return 'A';
                        } else {
                            return 'A1';
                        }
                        break;
                    case '2':
                        if (fleet.isFaster()) {
                            return 'E';
                        } else if (Ss > 0 && AS === 0) {
                            return 'D';
                        } else if (BBs + CV + CVB > 1) {
                            return 'D';
                        } else if (Ds < 4) {
                            return 'D';
                        } else {
                            return 'E';
                        }
                        break;
                    case 'A1':
                        if (Ss > 0) {
                            return 'A2';
                        } else if (BBCVs > 2) {
                            return 'A2';
                        } else if (BBs > 1) {
                            return 'A2';
                        } else {
                            return 'A';
                        }
                        break;
                    case 'C':
                        if (f_seek[3] >= 70) {
                            return 'C2';
                        } else {
                            return 'C1';
                        }
                        break;
                    case 'E':
                        if (fleet.isFaster()) {
                            return 'G';
                        } else if (Ds > 5) {
                            return 'G';
                        } else if (Ds > 4 && CA > 1 && CV + CVB === 0 && CVL < 2 && f_speed !== '低速艦隊') {
                            return 'G';
                        } else {
                            return 'F';
                        }
                        break;
                    case 'J':
                        if (true) {
                            return 'L';
                        } else {
                            return 'K';
                        }
                        break;
                    case 'M2':
                        if (fleet.isFaster()) {
                            return 'N';
                        } else if (f_type === '空母機動部隊') {
                            return 'N';
                        } else {
                            return 'M3';
                        }
                        break;
                    case 'O':
                        if (fleet.isFaster()) {
                            return 'O2';
                        } else if (fleet.countYamatoClass() > 0) {
                            return 'O1';
                        } else if (CVs > 3) {
                            return 'O1';
                        } else if (CV + CVB > 2) {
                            return 'O1';
                        } else if (Ds < 4) {
                            return 'O1';
                        } else {
                            return 'O2';
                        }
                        break;
                    case 'Q':
                        if (BBs > 3) {
                            return 'R1';
                        } else if (fleet.isFaster()) {
                            return 'R';
                        } else if (fleet.countYamatoClass() > 1) {
                            return 'R1';
                        } else if (fleet.countYamatoClass() === 1 && f_speed === '低速艦隊') {
                            return 'R1';
                        } else if (BBs > 2) {
                            return 'R1';
                        } else {
                            return 'R';
                        }
                        break;
                    case 'R1':
                        if (f_speed !== '低速艦隊') {
                            return 'R';
                        } else if (fleet.countYamatoClass() + fleet.countShip('Iowa') > 1) {
                            return 'R2';
                        } else if (BB > 1) {
                            return 'R2';
                        } else {
                            return 'R';
                        }
                        break;
                    case 'S':
                        if (fleet.countYamatoClass() > 1) {
                            return 'S2';
                        } else if (CV + CVB > 0) {
                            return 'S2';
                        } else if (Ds < 3) {
                            return 'S2';
                        } else if (f_speed !== '低速艦隊') {
                            if (CA > 1 && CVL < 2) {
                                return 'T';
                            } else {
                                return 'S1';
                            }
                        } else if (f_speed === '低速艦隊') {
                            if (CL + CT > 2) {
                                return 'S1';
                            } else {
                                return 'S2';
                            }
                        }
                        break;
                    case 'S2':
                        if (BBs === 0 && f_speed !== '低速艦隊') {
                            return 'T';
                        } else {
                            return 'S1';
                        }
                        break;
                    case 'T':
                        if (f_seek[1] >= 65) {
                            return 'V';
                        } else {
                            return 'U';
                        }
                        break;
                    case 'Z':
                        if (f_seek[1] < 83) {
                            return 'Z1';
                        } else if (fleet.countAktmrPlusCVs() > 2) {
                            return 'Y';
                        } else if (CAs > 3) {
                            return 'Y';
                        } else if (BBs > 3) {
                            return 'Z1';
                        } else if (Number(option.phase) < 3) {
                            if (fleet.isFaster()) {
                                return 'Y';
                            } else if (BBs > 2) {
                                return 'Z1';
                            } else {
                                return 'Y';
                            }
                        } else if (Number(option.phase) === 3) {
                            if (fleet.isFaster()) {
                                return 'ZZ';
                            } else if (BBs > 2) {
                                return 'Z1';
                            } else if (fleet.countYamatoClass() === 0) {
                                return 'ZZ';
                            } else if (fleet.countYamatoClass() === 1 && BBs < 3 && CAs > 1 && CL + CT > 1 && Ds > 3) {
                                return 'ZZ';
                            } else {
                                return 'Z1';
                            }
                        }
                        break;
                    case 'Z1':
                        if (true) {
                            return 'ZZ';
                        } else {
                            return 'Z2';
                        }
                        break;
                    case 'G':
                        if (option.G === 'H') {
                            return 'H';
                        } else {
                            return 'I';
                        }
                        break;
                    case 'O2':
                        if (option.O2 === 'P') {
                            return 'P';
                        } else {
                            return 'Q';
                        }
                        break;
                    case 'W':
                        if (option.W === 'Z') {
                            return 'Z';
                        } else {
                            return 'X';
                        }
                        break;
                }
            break;
        }

        console.log('node: ', node);
        console.log('route: ', scanner.route);
        throw new CustomError('条件漏れ');
    }
}