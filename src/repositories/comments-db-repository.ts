import { ApiTypes } from "../types/types";
import { commentsCollection } from "./db";

class CommentsRepositoryModel {
	public async createComments(comment: ApiTypes.ICommentModel): Promise<boolean> {
		try {
			let result = await commentsCollection.insertOne(comment);
			return result.acknowledged;
		} catch (error) {
			console.error(error);
			return false;
		}
	}

	public async updateComments(comment: ApiTypes.ICommentModel): Promise<boolean> {
		try {
			let result = await commentsCollection.updateOne({id: comment.id}, comment);
			if (result.matchedCount == 0) {
				return false;
			}
			return true;
		} catch (error) {
			console.error(error);
			return false;
		}
	}

	public async deleteComment(commentId: string){
		try {
			let result = await commentsCollection.deleteOne({commentId});
			return result.deletedCount > 0 ? true : false;
		} catch (error) {
			console.log(error);
			return false;
		}
	}
}

export const CommentsRepository = new CommentsRepositoryModel();

