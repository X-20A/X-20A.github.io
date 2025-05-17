import AdoptFleet from "@/core/AdoptFleet";
import { AreaId, ItemIconKey } from "../types";
import Composition from "../Composition";
import ResourceIconSuite from "./ResourceIconSuite";

export default class SyonanResource {
    public readonly composition: Composition;
    public readonly fleet_total_drum: number;
    public readonly fleet_total_craft: number;
    public readonly icon_suite: ResourceIconSuite;
    public readonly add_fuel: number;
    public readonly add_imo: number;

    public readonly BASE_FUEL = 40;
    public readonly BASE_IMO = 20;
    public readonly MAX_FUEL = 200;
    public readonly MAX_IMO = 120;

    /**
     * 燃料装備係数
     */
    public readonly FUEL_EQUIP_COEFFICIENT = {
        drum: 8,
        craft: 7,
    };

    /**
     * 弾薬装備係数
     */
    public readonly IMO_EQUIP_COEFFICIENT = {
        drum: 6,
        craft: 10,
    };

    /**
     * 燃料編成係数
     */
    public readonly FUEL_COMPOSITION_COEFFICIENT = {
        BBV: 10,
        CVL: 7,
        AV: 6,
        AS: 5,
        LHA: 8,
        AO: 22,
    };

    /**
     * 弾薬編成係数
     */
    public readonly IMO_COMPOSITION_COEFFICIENT = {
        BBV: 10,
        CVL: 4,
        AV: 5,
        AS: 5,
        LHA: 7,
        AO: 16,
    };

    private constructor(fleet: AdoptFleet, icons: Record<ItemIconKey, string>, drum: string, craft: string) {
        this.composition = fleet.composition;
        this.fleet_total_drum = fleet.getTotalDrumCount();
        this.fleet_total_craft = fleet.getTotalValidCraftCount();
        this.icon_suite = new ResourceIconSuite(icons, drum, craft);

        this.add_fuel = this.fleet_total_drum * this.FUEL_EQUIP_COEFFICIENT.drum
            + this.fleet_total_craft * this.FUEL_EQUIP_COEFFICIENT.craft
            + this.composition.BBV * this.FUEL_COMPOSITION_COEFFICIENT.BBV
            + this.composition.CVL * this.FUEL_COMPOSITION_COEFFICIENT.CVL
            + this.composition.AV * this.FUEL_COMPOSITION_COEFFICIENT.AV
            + this.composition.AS * this.FUEL_COMPOSITION_COEFFICIENT.AS
            + this.composition.LHA * this.FUEL_COMPOSITION_COEFFICIENT.LHA
            + this.composition.AO * this.FUEL_COMPOSITION_COEFFICIENT.AO;

        this.add_imo = this.fleet_total_drum * this.IMO_EQUIP_COEFFICIENT.drum
            + this.fleet_total_craft * this.IMO_EQUIP_COEFFICIENT.craft
            + this.composition.BBV * this.IMO_COMPOSITION_COEFFICIENT.BBV
            + this.composition.CVL * this.IMO_COMPOSITION_COEFFICIENT.CVL
            + this.composition.AV * this.IMO_COMPOSITION_COEFFICIENT.AV
            + this.composition.AS * this.IMO_COMPOSITION_COEFFICIENT.AS
            + this.composition.LHA * this.IMO_COMPOSITION_COEFFICIENT.LHA
            + this.composition.AO * this.IMO_COMPOSITION_COEFFICIENT.AO;
    }

    static createSyonanResource(
        area_id: AreaId,
        node: string,
        fleet: AdoptFleet,
        icons: Record<ItemIconKey, string>,
        drum: string,
        craft: string,
    ): SyonanResource | null {
        if (area_id !== '7-4') return null;
        if (node !== 'O') return null;
        
        return new SyonanResource(fleet, icons, drum, craft);
    }
}