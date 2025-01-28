export default class CustomError extends Error {
	constructor(message: any) {
		super(message);
		this.name = 'CustomError';
	}
}
