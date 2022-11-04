"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkError = void 0;
const express_validator_1 = require("express-validator");
const checkError = (req, res, next) => {
    const result = (0, express_validator_1.validationResult)(req);
    if (!result.isEmpty()) {
        let errors = result.array({ onlyFirstError: true }).map(er => ({ field: er.param, message: er.msg }));
        return res.status(400).json({ errorsMessages: errors });
    }
    next();
};
exports.checkError = checkError;
// export const checkErrorNotFound = (req: Request, res: Response, next: NextFunction) => {
// 	const result = validationResult(req);
// 	if (!result.isEmpty()) {
// 		console.log(result);
// 		return res.sendStatus(404);
// 	}
// 	next();
// }
