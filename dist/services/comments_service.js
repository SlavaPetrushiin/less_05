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
exports.CommentsService = void 0;
const comments_db_repository_1 = require("./../repositories/comments-db-repository");
const query_db_repository_1 = require("./../repositories/query-db-repository");
class CommentsService {
    static createComments(user, comment, postId) {
        return __awaiter(this, void 0, void 0, function* () {
            const newComments = {
                id: (new Date().getMilliseconds()).toString(),
                content: comment,
                userId: user.userId,
                userLogin: user.login,
                createdAt: new Date().toISOString(),
                postId
            };
            let result = yield comments_db_repository_1.CommentsRepository.createComments(newComments);
            return result
                ? {
                    id: newComments.id,
                    content: newComments.content,
                    userId: newComments.userId,
                    userLogin: newComments.userLogin,
                    createdAt: newComments.createdAt
                }
                : false;
        });
    }
    static updateComment(commentId, content, user) {
        return __awaiter(this, void 0, void 0, function* () {
            let comment = yield query_db_repository_1.QueryRepository.getOneComment(commentId);
            if (!comment) {
                return false;
            }
            comment.content = content;
            let isUpdatedComment = yield comments_db_repository_1.CommentsRepository.updateComments(comment);
            return isUpdatedComment;
        });
    }
    static deleteComment(commentId) {
        return __awaiter(this, void 0, void 0, function* () {
            return comments_db_repository_1.CommentsRepository.deleteComment(commentId);
        });
    }
    static deleteAllComments() {
        return __awaiter(this, void 0, void 0, function* () {
            return comments_db_repository_1.CommentsRepository.deleteAllComments();
        });
    }
}
exports.CommentsService = CommentsService;
