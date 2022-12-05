import { RefreshTokensRepository } from './../repositories/refreshToken-db-repository';
import { AuthService } from './../services/auth_service';
import { CommentsService } from './../services/comments_service';
import { UsersService } from './../services/users_service';
import { PostService } from './../services/posts_service';
import { BlogsService } from './../services/blogs_service';
import express, {Request, Response} from 'express';
import { ClientsRepository } from '../repositories/clients-db-repository';
import { refreshTokensCollection } from '../repositories/db';

export const routerTesting = express.Router();

routerTesting.delete('/all-data', async (req: Request, res: Response) => {
	await BlogsService.deleteAllBlogs();
	await PostService.deleteAllBPosts();
	await ClientsRepository.deleteUsers();
	await CommentsService.deleteAllComments();
	await refreshTokensCollection.deleteMany({});
	res.sendStatus(204);
})
