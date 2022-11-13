import { checkBearerAuth } from './../utils/checkBearerAuth';
import { checkError, checkErrorAuth } from './../utils/checkError';
import express, { Request, Response } from 'express';
import { loginValidator } from '../validators/usersValidator';
import { UsersService } from './../services/users_service';
import { ServiceJWT } from '../services/jwt_service';
export const routerAuth = express.Router();

interface ILogin{
	password: string;
	login: string;
}

routerAuth.get('/me', checkBearerAuth,  async (req: Request<{}, {}, ILogin>, res: Response) => {
	let user = req.user;
	res.send(user);
})

routerAuth.post('/login', loginValidator, checkErrorAuth,  async (req: Request<{}, {}, ILogin>, res: Response) => {
	let {login, password} = req.body;
	console.log(login, password);
	let user = await UsersService.login(login, password);
	if(!user){
		res.sendStatus(401);
		return
	}

	const accessToken = await ServiceJWT.addJWT(user);

	if(!accessToken){
		res.sendStatus(401);
		return
	}

	res.send({accessToken});
})

