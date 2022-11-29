import { MongoClient } from "mongodb";
import { ApiTypes } from "../types/types";

const url = process.env.mongoURL;

if(!url){
	throw new Error("Not connect DB")
}

const client = new MongoClient(url);
const dbName = "blogsAndPosts";
export const db = client.db(dbName);

export const blogsCollection = db.collection<ApiTypes.IBlog>("blogs");
export const postsCollection = db.collection<ApiTypes.IPost>("posts");
export const usersCollection = db.collection<ApiTypes.IUserDB>("users");
export const commentsCollection = db.collection<ApiTypes.ICommentModel>("comments");
export const clientsCollection = db.collection<ApiTypes.IClientDB>("clients");

export async function runDB(){
	try {
		await client.connect();
		console.log('Connected successfully to server');
	} catch (error) {
		console.error(error);
		//await client.close();
	}
}