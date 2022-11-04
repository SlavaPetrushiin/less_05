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
exports.routerPosts = void 0;
const checkAuth_1 = require("../utils/checkAuth");
const express_1 = __importDefault(require("express"));
const checkError_1 = require("../utils/checkError");
const postsValidator_1 = require("../validators/postsValidator");
const posts_service_1 = require("../services/posts_service");
const checkQuery_1 = require("../utils/checkQuery");
const query_db_repository_1 = require("../repositories/query-db-repository");
exports.routerPosts = express_1.default.Router();
exports.routerPosts.get('/', checkQuery_1.checkQueryPostsAndBlogs, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { pageNumber, pageSize, sortBy, sortDirection } = req.query;
    let posts = yield query_db_repository_1.QueryRepository.getPosts({
        pageNumber: pageNumber,
        pageSize: pageSize,
        sortBy: sortBy,
        sortDirection: sortDirection
    });
    res.send(posts);
}));
exports.routerPosts.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let id = req.params.id;
    let foundedPost = yield query_db_repository_1.QueryRepository.getOnePost(id);
    if (!foundedPost) {
        return res.sendStatus(404);
    }
    res.send(foundedPost);
}));
exports.routerPosts.post('/', checkAuth_1.checkAuth, postsValidator_1.createAndUpdatePostsValidator, checkError_1.checkError, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { blogId, content, shortDescription, title } = req.body;
    let newPost = yield posts_service_1.PostService.createPost({ blogId, content, shortDescription, title });
    if (!newPost) {
        return res.sendStatus(404);
    }
    res.status(201).send(newPost);
}));
exports.routerPosts.put('/:id', checkAuth_1.checkAuth, postsValidator_1.createAndUpdatePostsValidator, checkError_1.checkError, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { blogId, content, shortDescription, title } = req.body;
    let { id } = req.params;
    let isUpdatedBPost = yield posts_service_1.PostService.updatePost({ id, blogId, content, shortDescription, title });
    if (!isUpdatedBPost) {
        return res.sendStatus(404);
    }
    res.sendStatus(204);
}));
exports.routerPosts.delete('/:id', checkAuth_1.checkAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { id } = req.params;
    let isDeletesPost = yield posts_service_1.PostService.deletePost(id);
    if (!isDeletesPost) {
        return res.sendStatus(404);
    }
    res.sendStatus(204);
}));
