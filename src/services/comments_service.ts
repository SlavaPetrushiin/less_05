import { commentsCollection } from './../repositories/db';
import { CommentsRepository } from './../repositories/comments-db-repository';
import { QueryRepository } from './../repositories/query-db-repository';
import { ApiTypes } from "../types/types";

interface ICreatePost {
	email: string;
	login: string;
	userId: string;
}

export class CommentsService {
	static async createComments(user: ICreatePost, comment: string) {
		const newComments: ApiTypes.ICommentModel = {
			id: (new Date().getMilliseconds()).toString(),
			content: comment,
			userId: user.userId,
			userLogin: user.login,
			createdAt: new Date().toISOString(),
		}
		let result = await CommentsRepository.createComments(newComments);
		return result ? newComments : false;
	}

	static async updateComment(commentId: string, content: string, user: { email: string; login: string; userId: string; }) {
		let comment = await QueryRepository.getOneComment(commentId);

		if (!comment) {
			return false;
		}

		comment.content = content;

		let isUpdatedComment = await CommentsRepository.updateComments(comment);
		return isUpdatedComment;
	}

	static async deleteComment(commentId: string) {
		return CommentsRepository.deleteComment(commentId);
	}

	static async deleteAllComments(){
		return CommentsRepository.deleteAllComments();
	}
}