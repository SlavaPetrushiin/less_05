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
const authRouter_1 = require("./routers/authRouter");
const usersRouter_1 = require("./routers/usersRouter");
const express_1 = __importDefault(require("express"));
const db_1 = require("./repositories/db");
const blogRouter_1 = require("./routers/blogRouter");
const postsRouter_1 = require("./routers/postsRouter");
const tetstingRouter_1 = require("./routers/tetstingRouter");
const commentsRouter_1 = require("./routers/commentsRouter");
const app = (0, express_1.default)();
app.use(express_1.default.json());
const port = process.env.PORT || 3000;
app.use('/auth', authRouter_1.routerAuth);
app.use('/users', usersRouter_1.routerUsers);
app.use('/posts', postsRouter_1.routerPosts);
app.use('/blogs', blogRouter_1.routerBlogs);
app.use('/comments', commentsRouter_1.routerComments);
app.use('/testing', tetstingRouter_1.routerTesting);
app.use((req, res) => {
    res.type('text/plain');
    res.status(404);
    res.send('404 - Не найдено');
});
app.use((err, req, res, next) => {
    console.error(err);
    res.type('text/plain');
    res.status(500);
    res.send('500 - Ошибка сервера');
});
const startApp = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, db_1.runDB)();
    app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
        console.log(`Example app listening on port ${port}`);
    }));
});
startApp();
