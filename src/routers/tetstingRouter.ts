import { PostService } from './../services/posts_service';
import { BlogsService } from './../services/blogs_service';
import express, {Request, Response} from 'express';

export const routerTesting = express.Router();

routerTesting.delete('/all-data', async (req: Request, res: Response) => {
	await BlogsService.deleteAllBlogs();
	await PostService.deleteAllBPosts();
	res.sendStatus(204);
})
