"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isExistsBlogValidator = exports.checkBlogValidator = exports.createAndUpdateBlogValidator = void 0;
const postsValidator_1 = require("./postsValidator");
const express_validator_1 = require("express-validator");
const checkUrl = (url) => {
    let pattern = new RegExp('^https://([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$');
    return pattern.test(url);
};
exports.createAndUpdateBlogValidator = [
    (0, express_validator_1.body)("name").isString().trim().isLength({ min: 1, max: 15 }).withMessage("В названии блога должно быть от 1 до 15 символов"),
    (0, express_validator_1.body)("websiteUrl").isString().trim().isLength({ min: 1, max: 100 }).custom(checkUrl).withMessage("Укажите валидную ссылку"),
    (0, express_validator_1.body)("description").isString().trim().isLength({ min: 1, max: 500 }).withMessage("В описание должно быть не более 500 симвловов")
];
exports.checkBlogValidator = [
    (0, express_validator_1.body)("title").isString().trim().isLength({ min: 1, max: 30 }).withMessage("В заголовке должно быть от 1 до 30 символов"),
    (0, express_validator_1.body)("shortDescription").trim().isString().isLength({ min: 1, max: 100 }).withMessage("В описание должно быть от 1 до 100 символов"),
    (0, express_validator_1.body)("content").isString().trim().isLength({ min: 1, max: 1000 }).withMessage("Напишите пост"),
];
exports.isExistsBlogValidator = [
    (0, express_validator_1.param)("id").custom(postsValidator_1.checkBlogID).withMessage("Блога не существет"),
];
