"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentValidator = void 0;
const express_validator_1 = require("express-validator");
exports.commentValidator = [
    (0, express_validator_1.body)("content").isString().trim().isLength({ min: 20, max: 300 }).withMessage("Контент не валидный"),
];
