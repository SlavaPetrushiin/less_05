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
exports.runDB = exports.usersCollection = exports.postsCollection = exports.blogsCollection = exports.db = void 0;
const mongodb_1 = require("mongodb");
const url = process.env.mongoURL || 'mongodb+srv://admin:Atg-CC6-y2A-B5H@cluster0.uk9jguo.mongodb.net/?retryWrites=true&w=majority';
const client = new mongodb_1.MongoClient(url);
const dbName = "blogsAndPosts";
exports.db = client.db(dbName);
exports.blogsCollection = exports.db.collection("blogs");
exports.postsCollection = exports.db.collection("posts");
exports.usersCollection = exports.db.collection("users");
function runDB() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.connect();
            console.log('Connected successfully to server');
        }
        catch (error) {
            console.error(error);
            //await client.close();
        }
    });
}
exports.runDB = runDB;