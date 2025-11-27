export default class CustomError extends Error {
    constructor(message: string) {
        super(message);
        this.name = new.target.name;
    }
}