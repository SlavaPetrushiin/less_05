import { Request, Response, NextFunction, } from "express";
import { validationResult } from "express-validator";

export const checkError = (req: Request, res: Response, next: NextFunction) => {
	const result = validationResult(req);
	if (!result.isEmpty()) {
		let errors = result.array({ onlyFirstError: true }).map(er => ({field: er.param, message: er.msg}));
		return res.status(400).json({ errorsMessages: errors });
	}
	next();
}

// export const checkErrorNotFound = (req: Request, res: Response, next: NextFunction) => {
// 	const result = validationResult(req);
// 	if (!result.isEmpty()) {
// 		console.log(result);
// 		return res.sendStatus(404);
// 	}
// 	next();
// }