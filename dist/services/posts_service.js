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
exports.PostService = void 0;
const query_db_repository_1 = require("./../repositories/query-db-repository");
const posts_db_repository_1 = require("./../repositories/posts-db-repository");
class PostService {
    static createPost(params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { blogId, content, shortDescription, title } = params;
                let foundedBlog = yield query_db_repository_1.QueryRepository.getOneBlog(blogId);
                if (!foundedBlog) {
                    return false;
                }
                let newPost = {
                    id: (new Date().getMilliseconds()).toString(),
                    title,
                    shortDescription,
                    content,
                    blogId,
                    blogName: foundedBlog.name,
                    createdAt: new Date().toISOString()
                };
                const result = yield posts_db_repository_1.PostsRepository.createPost(Object.assign({}, newPost));
                if (!result)
                    return false;
                return newPost;
            }
            catch (error) {
                console.error(error);
                return false;
            }
        });
    }
    static updatePost(params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { blogId, id } = params;
                let foundedPost = yield query_db_repository_1.QueryRepository.getOnePost(id);
                let foundedBlog = yield query_db_repository_1.QueryRepository.getOneBlog(blogId);
                if (!foundedBlog || !foundedPost) {
                    return false;
                }
                return yield posts_db_repository_1.PostsRepository.updatePost(params);
            }
            catch (error) {
                console.error(error);
                return false;
            }
        });
    }
    static deletePost(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return posts_db_repository_1.PostsRepository.deletePost(id);
        });
    }
    static deleteAllBPosts() {
        return __awaiter(this, void 0, void 0, function* () {
            yield posts_db_repository_1.PostsRepository.deleteAllBPosts();
        });
    }
    static removeAllPostsAndBlog(blogId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield posts_db_repository_1.PostsRepository.removeAllPostsDeletedBlog(blogId);
        });
    }
}
exports.PostService = PostService;
