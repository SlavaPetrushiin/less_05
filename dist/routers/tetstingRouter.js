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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerTesting = void 0;
const comments_service_1 = require("./../services/comments_service");
const posts_service_1 = require("./../services/posts_service");
const blogs_service_1 = require("./../services/blogs_service");
const express_1 = __importDefault(require("express"));
const clients_db_repository_1 = require("../repositories/clients-db-repository");
exports.routerTesting = express_1.default.Router();
exports.routerTesting.delete('/all-data', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield blogs_service_1.BlogsService.deleteAllBlogs();
    yield posts_service_1.PostService.deleteAllBPosts();
    yield clients_db_repository_1.ClientsRepository.deleteUsers();
    yield comments_service_1.CommentsService.deleteAllComments();
    res.sendStatus(204);
}));
