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
exports.BlogsRepository = void 0;
const db_1 = require("./db");
class BlogsRepositoryModel {
    createBlog(blog) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let result = yield db_1.blogsCollection.insertOne(blog);
                return result.acknowledged;
            }
            catch (error) {
                console.error(error);
                return false;
            }
        });
    }
    updateBlog(blog) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { id, name, youtubeUrl } = blog;
                let result = yield db_1.blogsCollection.updateOne({ id }, {
                    $set: { name, youtubeUrl }
                });
                if (result.matchedCount == 0) {
                    return false;
                }
                return true;
            }
            catch (error) {
                console.error(error);
                return false;
            }
        });
    }
    deleteBlog(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let res = yield db_1.blogsCollection.deleteOne({ id });
                return res.deletedCount > 0 ? true : false;
            }
            catch (error) {
                console.error(error);
                return false;
            }
        });
    }
    deleteAllBlogs() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let result = yield db_1.blogsCollection.deleteMany({});
                return result.acknowledged ? true : false;
            }
            catch (error) {
                console.error(error);
                return false;
            }
        });
    }
}
exports.BlogsRepository = new BlogsRepositoryModel();
