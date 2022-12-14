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
exports.routerComments = void 0;
const checkError_1 = require("./../utils/checkError");
const query_db_repository_1 = require("./../repositories/query-db-repository");
const comments_service_1 = require("./../services/comments_service");
const checkBearerAuth_1 = require("./../utils/checkBearerAuth");
const express_1 = __importDefault(require("express"));
const commentValidator_1 = require("../validators/commentValidator");
exports.routerComments = express_1.default.Router();
exports.routerComments.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let comments = yield query_db_repository_1.QueryRepository.getComments();
    if (!comments) {
        return res.sendStatus(404);
    }
    res.send(comments);
}));
exports.routerComments.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let id = req.params.id;
    let comment = yield query_db_repository_1.QueryRepository.getOneComment(id);
    if (!comment) {
        return res.sendStatus(404);
    }
    res.send(comment);
}));
exports.routerComments.put('/:commentId', checkBearerAuth_1.checkBearerAuth, commentValidator_1.commentValidator, checkError_1.checkError, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let commentId = req.params.commentId;
    let content = req.body.content;
    let comment = yield query_db_repository_1.QueryRepository.getOneComment(commentId);
    if (!comment) {
        return res.sendStatus(404);
    }
    if (comment.userId != req.user.userId) {
        return res.sendStatus(403);
    }
    let isUpdatedComment = comments_service_1.CommentsService.updateComment(commentId, content, req.user);
    if (!isUpdatedComment) {
        return res.sendStatus(404);
    }
    res.sendStatus(204);
}));
exports.routerComments.delete('/:commentId', checkBearerAuth_1.checkBearerAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let commentId = req.params.commentId;
    let comment = yield query_db_repository_1.QueryRepository.getOneComment(commentId);
    if (!comment) {
        return res.sendStatus(404);
    }
    if (comment.userId != req.user.userId) {
        return res.sendStatus(403);
    }
    let isDeleted = yield comments_service_1.CommentsService.deleteComment(commentId);
    if (!isDeleted) {
        return res.sendStatus(404);
    }
    res.sendStatus(204);
}));
