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
exports.routerBlogs = void 0;
const query_db_repository_1 = require("./../repositories/query-db-repository");
const posts_service_1 = require("./../services/posts_service");
const blogsValidator_1 = require("./../validators/blogsValidator");
const checkBasicAuth_1 = require("../utils/checkBasicAuth");
const express_1 = __importDefault(require("express"));
const checkError_1 = require("../utils/checkError");
const blogs_service_1 = require("../services/blogs_service");
const checkQueryPostsAndBlogs_1 = require("../utils/checkQueryPostsAndBlogs");
exports.routerBlogs = express_1.default.Router();
exports.routerBlogs.get('/', checkQueryPostsAndBlogs_1.checkQueryPostsAndBlogs, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.baseUrl);
    let { searchNameTerm, pageNumber, pageSize, sortBy, sortDirection } = req.query;
    let blogs = yield query_db_repository_1.QueryRepository.getAllBlogs({
        searchNameTerm: searchNameTerm,
        pageNumber: pageNumber,
        pageSize: pageSize,
        sortBy: sortBy,
        sortDirection: sortDirection
    });
    res.send(blogs);
}));
exports.routerBlogs.post('/', checkBasicAuth_1.checkBasicAuth, blogsValidator_1.createAndUpdateBlogValidator, checkError_1.checkError, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { name, youtubeUrl } = req.body;
    let newBlog = yield blogs_service_1.BlogsService.createBlog(name, youtubeUrl);
    if (!newBlog)
        return res.sendStatus(400);
    return res.status(201).send(newBlog);
}));
exports.routerBlogs.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let id = req.params.id;
    let blog = yield query_db_repository_1.QueryRepository.getOneBlog(id);
    if (!blog) {
        return res.sendStatus(404);
    }
    return res.send(blog);
}));
exports.routerBlogs.get('/:id/posts', checkQueryPostsAndBlogs_1.checkQueryPostsAndBlogs, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let id = req.params.id;
    let blog = yield query_db_repository_1.QueryRepository.getOneBlog(id);
    if (!blog)
        return res.sendStatus(404);
    let { pageNumber, pageSize, sortBy, sortDirection } = req.query;
    let posts = yield query_db_repository_1.QueryRepository.getPosts({
        pageNumber: pageNumber,
        pageSize: pageSize,
        sortBy: sortBy,
        sortDirection: sortDirection
    }, id);
    if (!posts) {
        return res.sendStatus(404);
    }
    return res.send(posts);
}));
exports.routerBlogs.post('/:id/posts', checkBasicAuth_1.checkBasicAuth, blogsValidator_1.checkBlogValidator, checkError_1.checkError, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let id = req.params.id;
    let blog = yield query_db_repository_1.QueryRepository.getOneBlog(id);
    if (!blog)
        return res.sendStatus(404);
    let { content, shortDescription, title } = req.body;
    let newPost = yield posts_service_1.PostService.createPost({ blogId: id, content, shortDescription, title });
    if (!newPost) {
        return res.sendStatus(404);
    }
    res.status(201).send(newPost);
}));
exports.routerBlogs.put('/:id', checkBasicAuth_1.checkBasicAuth, blogsValidator_1.createAndUpdateBlogValidator, checkError_1.checkError, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { name, youtubeUrl, createdAt } = req.body;
    let { id } = req.params;
    let isUpdatedBlog = yield blogs_service_1.BlogsService.updateBlog({ id, name, youtubeUrl, createdAt });
    if (!isUpdatedBlog) {
        return res.sendStatus(404);
    }
    res.sendStatus(204);
}));
exports.routerBlogs.delete('/:id', checkBasicAuth_1.checkBasicAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { id } = req.params;
    let isDeletesBlog = yield blogs_service_1.BlogsService.deleteBlog(id);
    if (!isDeletesBlog) {
        return res.sendStatus(404);
    }
    posts_service_1.PostService.removeAllPostsAndBlog(id);
    res.sendStatus(204);
}));
