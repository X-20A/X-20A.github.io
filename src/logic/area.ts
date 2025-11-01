import { AreaId } from "../types";

export type AreaContents = {
    world: number,
    section: number,
}

export function disassembly_area_id(
    area_id: AreaId,
): AreaContents {
    const splitted_area = area_id.split('-');
    const contents: AreaContents = {
        world: Number(splitted_area[0]),
        section: Number(splitted_area[1]),
    };

    return contents;
}