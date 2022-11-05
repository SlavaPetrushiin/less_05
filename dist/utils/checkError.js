"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkErrorAuth = exports.checkError = void 0;
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
const checkErrorAuth = (req, res, next) => {
    const result = (0, express_validator_1.validationResult)(req);
    if (!result.isEmpty()) {
        let errors = result.array({ onlyFirstError: true }).map(er => ({ field: er.param, message: er.msg }));
        return res.status(401).json({ errorsMessages: errors });
    }
    next();
};
exports.checkErrorAuth = checkErrorAuth;
