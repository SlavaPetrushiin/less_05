import { checkError, checkErrorAuth } from './../utils/checkError';
import express, { Request, Response } from 'express';
import { loginValidator } from '../validators/usersValidator';
import { UsersService } from './../services/users_service';
export const routerAuth = express.Router();

interface ILogin{
	password: string;
	login: string;
}

routerAuth.post('/login', loginValidator, checkErrorAuth,  async (req: Request<{}, {}, ILogin>, res: Response) => {
	let {login, password} = req.body;
	let isAuth = await UsersService.login(login, password);
	if(!isAuth){
		res.sendStatus(401);
		return
	}

	res.sendStatus(204);
})

