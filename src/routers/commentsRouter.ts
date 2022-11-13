import { QueryRepository } from './../repositories/query-db-repository';
import { CommentsService } from './../services/comments_service';
import { checkBearerAuth } from './../utils/checkBearerAuth';
import express, {Request, Response} from 'express';

export const routerComments = express.Router();

routerComments.get('/', checkBearerAuth , async (req: Request<{id: string}>, res) => {
	res.send(200)
})

routerComments.get('/:id',async (req: Request<{id: string}>, res) => {
	let id = req.params.id;
	let comment = await QueryRepository.getOneComment(id);
	if(!comment){
		return res.sendStatus(404)
	}

	res.send(comment)
})

routerComments.post('/', checkBearerAuth, async (req: Request<{}, {}, {content: string}>, res: Response) => {
	let comment = req.body.content;
	let user = req.user;
	let newComments = await CommentsService.createComments(user!, comment);
	if (!newComments) return res.sendStatus(400);
	return res.status(201).send(newComments);
})

routerComments.put('/:commentId', checkBearerAuth, async (req: Request<{commentId: string}, {}, {content: string}>, res: Response) => {
	let commentId = req.params.commentId;
	let content = req.body.content;

	if(commentId != req.user?.userId){
		res.sendStatus(403);
	}

	let isUpdatedComment = CommentsService.updateComment(commentId, content, req.user!);

	if(!isUpdatedComment){
		res.sendStatus(404);
	}

	res.sendStatus(204);
})

routerComments.delete('/:commentId', checkBearerAuth, async (req: Request<{commentId: string}>, res) => {
	let commentId = req.params.commentId;

	if(commentId != req.user?.userId){
		res.sendStatus(403);
	}

	let isDeleted = await CommentsService.deleteComment(commentId);

	if(!isDeleted){
		res.sendStatus(404);
	}

	res.sendStatus(204);
})



