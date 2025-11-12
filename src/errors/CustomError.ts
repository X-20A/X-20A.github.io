export default class CustomError extends Error {
    constructor(message: string) {
        super(message);
        this.name = new.target.name;
    }
}

/** 指定の海域では出撃できない編成 */
export class DisallowToSortie extends CustomError {}
/** 分岐条件に漏れがある */
export class OmissionOfConditions extends CustomError {}