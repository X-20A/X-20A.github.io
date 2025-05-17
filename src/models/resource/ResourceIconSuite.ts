import { ItemIconKey } from "../types";

export default class ResourceIconSuite {
    public readonly fuel: string;
    public readonly ammo: string;
    public readonly steel: string;
    public readonly imo: string;
    public readonly drum: string;
    public readonly craft: string;

    constructor(icons: Record<ItemIconKey, string>, drum: string, craft: string) {
        this.fuel = icons.fuel;
        this.ammo = icons.ammo;
        this.steel = icons.steel;
        this.imo = icons.imo;
        this.drum = drum;
        this.craft = craft;
    }
}