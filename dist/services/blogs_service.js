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
exports.BlogsService = void 0;
const blogs_db_repository_1 = require("./../repositories/blogs-db-repository");
class BlogsService {
    static createBlog(name, description, websiteUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newBLog = {
                    id: (new Date().getMilliseconds()).toString(),
                    name,
                    websiteUrl,
                    description,
                    createdAt: new Date().toISOString()
                };
                let result = yield blogs_db_repository_1.BlogsRepository.createBlog(Object.assign({}, newBLog));
                return result ? newBLog : false;
            }
            catch (error) {
                console.error(error);
                return false;
            }
        });
    }
    static updateBlog(blog) {
        return __awaiter(this, void 0, void 0, function* () {
            return blogs_db_repository_1.BlogsRepository.updateBlog(blog);
        });
    }
    static deleteBlog(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield blogs_db_repository_1.BlogsRepository.deleteBlog(id);
        });
    }
    static deleteAllBlogs() {
        return __awaiter(this, void 0, void 0, function* () {
            return blogs_db_repository_1.BlogsRepository.deleteAllBlogs();
        });
    }
}
exports.BlogsService = BlogsService;
