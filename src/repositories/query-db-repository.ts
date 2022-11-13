import { ApiTypes } from '../types/types';
import { IQueryUsers } from '../utils/checkQueryUsers';
import { BlogsRepository } from './blogs-db-repository';
import { blogsCollection, postsCollection, usersCollection, commentsCollection } from "./db";

interface IReqAllBlogs {
	searchNameTerm: string;
	pageNumber: string;
	pageSize: string;
	sortBy: string;
	sortDirection: string;
}

interface IReqAllPosts {
	pageNumber: string;
	pageSize: string;
	sortBy: string;
	sortDirection: string;
}

export interface IUsersDBModel {
	pagesCount: number;
	page: number;
	pageSize: number;
	totalCount: number;
	items: ApiTypes.IUserDB[]
}

const DEFAULT_PROJECTION = { _id: false };

export class QueryRepository {
	static async getAllBlogs(params: IReqAllBlogs) {
		try {
			let { searchNameTerm, pageNumber, pageSize, sortBy, sortDirection } = params;
			let skip = (+pageNumber - 1) * +pageSize;

			let result = await blogsCollection.find(
				{ name: { $regex: searchNameTerm, $options: "$i" } },
				{ projection: { ...DEFAULT_PROJECTION } }
			)
				.skip(+skip)
				.limit(+pageSize)
				.sort({ [sortBy]: sortDirection == "asc" ? 1 : -1 })
				.toArray();

			let totalCount = await blogsCollection.countDocuments({ name: { $regex: searchNameTerm, $options: "$i" } });
			let pageCount = Math.ceil(totalCount / +pageSize);

			return {
				pagesCount: pageCount,
				page: +pageNumber,
				pageSize: +pageSize,
				totalCount: totalCount,
				items: result
			}

		} catch (error) {
			console.log("Error: ", error);
		}
	}

	static async getOneBlog(id: string): Promise<ApiTypes.IBlog | null> {
		try {
			return await blogsCollection.findOne({ id }, { projection: { ...DEFAULT_PROJECTION } });
		} catch (error) {
			console.error(error);
			return null;
		}
	}

	static async getPosts(queries: IReqAllPosts, blogId?: string) {
		try {
			let { pageNumber, pageSize, sortBy, sortDirection } = queries;
			let skip = (+pageNumber - 1) * +pageSize;
			let filter: any = {};

			if (blogId) {
				filter.blogId = blogId;
			}

			let result = await postsCollection.find(
				filter,
				{ projection: { ...DEFAULT_PROJECTION } }
			)
				.skip(+skip)
				.limit(+pageSize)
				.sort({ [sortBy]: sortDirection == "asc" ? 1 : -1 })
				.toArray();

			let totalCount = await postsCollection.countDocuments(filter, {});
			let pageCount = Math.ceil(totalCount / +pageSize);

			return {
				pagesCount: pageCount,
				page: +pageNumber,
				pageSize: +pageSize,
				totalCount: totalCount,
				items: result
			}
		} catch (error) {
			console.log("Error: ", error);
		}
	}

	static async getOnePost(id: string): Promise<ApiTypes.IPost | null> {
		try {
			return await postsCollection.findOne({ id }, { projection: { ...DEFAULT_PROJECTION } });
		} catch (error) {
			console.error(error);
			return null;
		}
	}

	static async getUser(params: {login?: string, id?: string}): Promise<ApiTypes.IUserDB | null> {
		try {
	
			let user = await usersCollection.findOne(params, { projection: { ...DEFAULT_PROJECTION  } });
			return user;
		} catch (error) {
			console.error("getUser: ", error);
			return null;
		}
	}

	static async getUsers(params: Required<IQueryUsers>): Promise<IUsersDBModel | null> {
		try {
			let { pageNumber, pageSize, searchEmailTerm, searchLoginTerm, sortBy, sortDirection } = params;
			console.log(pageNumber, pageSize, searchEmailTerm, searchLoginTerm, sortBy, sortDirection);
			let skip = (+pageNumber - 1) * +pageSize;

			let result = await usersCollection.find(
				{
					$or: [
						{ email: { $regex: searchEmailTerm, $options: "$i" } },
						{ login: { $regex: searchLoginTerm, $options: "$i" } }
					]
				},
				{ projection: { ...DEFAULT_PROJECTION, hasPassword: false } }
			)
				.skip(skip)
				.limit(+pageSize)
				.sort({ [sortBy]: sortDirection == "asc" ? 1 : -1 })
				.toArray();

			let totalCount = await usersCollection.countDocuments({
				$or: [
					{ email: { $regex: searchEmailTerm, $options: "$i" } },
					{ login: { $regex: searchLoginTerm, $options: "$i" } }
				]
			},)
			let pageCount = Math.ceil(totalCount / +pageSize);

			return {
				pagesCount: pageCount,
				page: +pageNumber,
				pageSize: +pageSize,
				totalCount,
				items: result
			}
		} catch (error) {
			console.error(`error --> getUsers - ${error}`);
			return null;
		}
	}

	static async getOneComment(commentId: string): Promise<ApiTypes.ICommentModel | null>{
		try {
			return await commentsCollection.findOne({id: commentId}, { projection: { ...DEFAULT_PROJECTION }});
		} catch (error) {
			console.error(error);
			return null;
		}
	}
}