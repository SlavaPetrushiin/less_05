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
exports.PostsRepository = void 0;
const db_1 = require("./db");
class PostRepositoryModel {
    createPost(post) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let result = yield db_1.postsCollection.insertOne(post);
                return result.acknowledged;
            }
            catch (error) {
                console.error(error);
                return false;
            }
        });
    }
    updatePost(params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { title, shortDescription, content, id } = params;
                let result = yield db_1.postsCollection.updateOne({ id }, { $set: { title, shortDescription, content } });
                return result.matchedCount > 0 ? true : false;
            }
            catch (error) {
                console.error(error);
                return false;
            }
        });
    }
    deletePost(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let result = yield db_1.postsCollection.deleteOne({ id });
                return result.deletedCount > 0 ? true : false;
            }
            catch (error) {
                return false;
            }
        });
    }
    removeAllPostsDeletedBlog(blogId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield db_1.postsCollection.deleteMany({ blogId });
        });
    }
    deleteAllBPosts() {
        return __awaiter(this, void 0, void 0, function* () {
            yield db_1.postsCollection.deleteMany({});
        });
    }
}
exports.PostsRepository = new PostRepositoryModel();
