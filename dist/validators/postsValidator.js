"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAndUpdatePostsValidator = exports.checkBlogID = void 0;
const query_db_repository_1 = require("./../repositories/query-db-repository");
const express_validator_1 = require("express-validator");
const checkBlogID = (blogId) => __awaiter(void 0, void 0, void 0, function* () {
    let foundedBlog = yield query_db_repository_1.QueryRepository.getOneBlog(blogId);
    if (!foundedBlog) {
        console.log("ERROR");
        return Promise.reject();
    }
});
exports.checkBlogID = checkBlogID;
exports.createAndUpdatePostsValidator = [
    (0, express_validator_1.body)("title").isString().trim().isLength({ min: 1, max: 30 }).withMessage("Укажите заголовок"),
    (0, express_validator_1.body)("shortDescription").trim().isString().isLength({ min: 1, max: 100 }).withMessage("Укажите краткое описание"),
    (0, express_validator_1.body)("content").isString().trim().isLength({ min: 1, max: 1000 }).withMessage("Напишите пост"),
    (0, express_validator_1.body)("blogId").isString().trim().custom(exports.checkBlogID).withMessage("Укажите ID блога"),
];
