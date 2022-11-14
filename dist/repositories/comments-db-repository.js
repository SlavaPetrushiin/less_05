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
exports.CommentsRepository = void 0;
const db_1 = require("./db");
class CommentsRepositoryModel {
    createComments(comment) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let result = yield db_1.commentsCollection.insertOne(comment);
                return result.acknowledged;
            }
            catch (error) {
                console.error(error);
                return false;
            }
        });
    }
    updateComments(comment) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let result = yield db_1.commentsCollection.updateOne({ id: comment.id }, { $set: { content: comment.content } });
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
    deleteComment(commentId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let result = yield db_1.commentsCollection.deleteOne({ id: commentId });
                return result.deletedCount > 0 ? true : false;
            }
            catch (error) {
                console.log(error);
                return false;
            }
        });
    }
    deleteAllComments() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let result = yield db_1.commentsCollection.deleteMany({});
                return result.deletedCount > 0 ? true : false;
            }
            catch (error) {
            }
        });
    }
}
exports.CommentsRepository = new CommentsRepositoryModel();
