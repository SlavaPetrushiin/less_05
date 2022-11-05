import { IUsersDBModel, QueryRepository } from './../repositories/query-db-repository';
import { checkAuth } from './../utils/checkAuth';
import { UsersService } from './../services/users_service';
import { checkErrorAuth } from './../utils/checkError';
import express, { Request, Response } from 'express';
import { userValidator } from '../validators/usersValidator';
import { checkQueryUsers, IQueryUsers } from '../utils/checkQueryUsers';

interface ICreateUserInput {
	login: string;
	password: string;
	email: string;
}

export const routerUsers = express.Router();

routerUsers.get("/", checkAuth, checkQueryUsers, async (req: Request<{}, {}, {}, IQueryUsers>, res: Response<IUsersDBModel>) => {
	let { pageNumber, pageSize, searchEmailTerm, searchLoginTerm, sortBy, sortDirection } = req.query;

	let users = await QueryRepository.getUsers({
		pageNumber: pageNumber!,
		pageSize: pageSize!,
		searchEmailTerm: searchEmailTerm!,
		searchLoginTerm: searchLoginTerm!,
		sortBy: sortBy!,
		sortDirection: sortDirection!
	});

	if(!users){
		res.sendStatus(404);
		return
	}

	res.send(users);
})

routerUsers.post("/", checkAuth, userValidator, checkErrorAuth, async (req: Request<{}, {}, ICreateUserInput>, res: Response) => {
	let { email, login, password } = req.body;
	let newUser = await UsersService.createUser(email, login, password);
	if (!newUser) {
		return res.sendStatus(404);
	}
	return res.status(201).send(newUser);
})


routerUsers.delete("/", checkAuth, async (req, res) => {
	UsersService.deleteUsers();
	res.sendStatus(204);
})

routerUsers.delete("/:id", checkAuth, async (req: Request<{ id: string }>, res: Response) => {
	let { id } = req.params;
	let isDeleted = await UsersService.deleteUser(id);

	if (!isDeleted) {
		return res.sendStatus(404);
	}
	return res.sendStatus(204);
})
