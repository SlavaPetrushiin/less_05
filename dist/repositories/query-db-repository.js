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
exports.QueryRepository = void 0;
const db_1 = require("./db");
const DEFAULT_PROJECTION = { _id: false };
class QueryRepository {
    static getAllBlogs(params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { searchNameTerm, pageNumber, pageSize, sortBy, sortDirection } = params;
                let skip = (+pageNumber - 1) * +pageSize;
                let result = yield db_1.blogsCollection.find({ name: { $regex: searchNameTerm, $options: "$i" } }, { projection: Object.assign({}, DEFAULT_PROJECTION) })
                    .skip(+skip)
                    .limit(+pageSize)
                    .sort({ [sortBy]: sortDirection == "asc" ? 1 : -1 })
                    .toArray();
                let totalCount = yield db_1.blogsCollection.countDocuments({ name: { $regex: searchNameTerm, $options: "$i" } });
                let pageCount = Math.ceil(totalCount / +pageSize);
                return {
                    pagesCount: pageCount,
                    page: +pageNumber,
                    pageSize: +pageSize,
                    totalCount: totalCount,
                    items: result
                };
            }
            catch (error) {
                console.log("Error: ", error);
            }
        });
    }
    static getOneBlog(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield db_1.blogsCollection.findOne({ id }, { projection: Object.assign({}, DEFAULT_PROJECTION) });
            }
            catch (error) {
                console.error(error);
                return null;
            }
        });
    }
    static getPosts(queries, blogId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { pageNumber, pageSize, sortBy, sortDirection } = queries;
                let skip = (+pageNumber - 1) * +pageSize;
                let filter = {};
                if (blogId) {
                    filter.blogId = blogId;
                }
                let result = yield db_1.postsCollection.find(filter, { projection: Object.assign({}, DEFAULT_PROJECTION) })
                    .skip(+skip)
                    .limit(+pageSize)
                    .sort({ [sortBy]: sortDirection == "asc" ? 1 : -1 })
                    .toArray();
                let totalCount = yield db_1.postsCollection.countDocuments(filter, {});
                let pageCount = Math.ceil(totalCount / +pageSize);
                return {
                    pagesCount: pageCount,
                    page: +pageNumber,
                    pageSize: +pageSize,
                    totalCount: totalCount,
                    items: result
                };
            }
            catch (error) {
                console.log("Error: ", error);
            }
        });
    }
    static getOnePost(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield db_1.postsCollection.findOne({ id }, { projection: Object.assign({}, DEFAULT_PROJECTION) });
            }
            catch (error) {
                console.error(error);
                return null;
            }
        });
    }
    static getUser(params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let user = yield db_1.usersCollection.findOne(params, { projection: Object.assign({}, DEFAULT_PROJECTION) });
                return user;
            }
            catch (error) {
                console.error("getUser: ", error);
                return null;
            }
        });
    }
    static getUsers(params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { pageNumber, pageSize, searchEmailTerm, searchLoginTerm, sortBy, sortDirection } = params;
                let skip = (+pageNumber - 1) * +pageSize;
                let result = yield db_1.usersCollection.find({
                    $or: [
                        { email: { $regex: searchEmailTerm, $options: "$i" } },
                        { login: { $regex: searchLoginTerm, $options: "$i" } }
                    ]
                }, { projection: Object.assign(Object.assign({}, DEFAULT_PROJECTION), { hasPassword: false }) })
                    .skip(skip)
                    .limit(+pageSize)
                    .sort({ [sortBy]: sortDirection == "asc" ? 1 : -1 })
                    .toArray();
                let totalCount = yield db_1.usersCollection.countDocuments({
                    $or: [
                        { email: { $regex: searchEmailTerm, $options: "$i" } },
                        { login: { $regex: searchLoginTerm, $options: "$i" } }
                    ]
                });
                let pageCount = Math.ceil(totalCount / +pageSize);
                return {
                    pagesCount: pageCount,
                    page: +pageNumber,
                    pageSize: +pageSize,
                    totalCount,
                    items: result
                };
            }
            catch (error) {
                console.error(`error --> getUsers - ${error}`);
                return null;
            }
        });
    }
    static getOneComment(commentId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield db_1.commentsCollection.findOne({ id: commentId }, { projection: Object.assign({}, DEFAULT_PROJECTION) });
            }
            catch (error) {
                console.error(error);
                return null;
            }
        });
    }
    static getCommentsByPostID(queries, postId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { pageNumber, pageSize, sortBy, sortDirection } = queries;
                let skip = (+pageNumber - 1) * +pageSize;
                let result = yield db_1.commentsCollection.find({ postId }, { projection: Object.assign({}, DEFAULT_PROJECTION) })
                    .skip(skip)
                    .limit(+pageSize)
                    .sort({ [sortBy]: sortDirection == "asc" ? 1 : -1 })
                    .toArray();
                let totalCount = yield db_1.commentsCollection.countDocuments({ postId });
                let pageCount = Math.ceil(totalCount / +pageSize);
                return {
                    pagesCount: pageCount,
                    page: +pageNumber,
                    pageSize: +pageSize,
                    totalCount,
                    items: result
                };
            }
            catch (error) {
                console.error(`error --> getCommentsByPostID - ${error}`);
                return null;
            }
        });
    }
}
exports.QueryRepository = QueryRepository;
