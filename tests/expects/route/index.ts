import { AreaId } from '../../../src/types';
import { FleetFixture } from '../../generator/fixture';
import { TEST_FLEET_DATAS_60 } from './world60';
import { TEST_FLEET_DATAS_61 } from './world61';

export type TestFleetData = {
    area: AreaId,
    routes: string[], // 編成と、能動分岐以外のoptionが同じなら複数設定可
    option: Record<string, string>, // 能動分岐は不要
    fleet: FleetFixture,
}

export const TEST_FLEET_DATAS = [
    ...TEST_FLEET_DATAS_60,
    ...TEST_FLEET_DATAS_61,
]; // @expansion
