import { checkBearerAuth } from './../utils/checkBearerAuth';
import { checkError, checkErrorAuth } from './../utils/checkError';
import express, { Request, Response } from 'express';
import { loginValidator, userValidator } from '../validators/usersValidator';
import { UsersService } from './../services/users_service';
import { ServiceJWT } from '../services/jwt_service';
import { Email } from '../lib/email';
import { AuthService } from '../services/auth_service';
export const routerAuth = express.Router();

interface ILogin {
	password: string;
	loginOrEmail: string;
}

interface IRegistration {
	password: string;
	login: string;
	email: string;
}

routerAuth.get('/me', checkBearerAuth, async (req: Request<{}, {}, ILogin>, res: Response) => {
	let user = req.user;
	res.send(user);
})

routerAuth.post('/login', loginValidator, checkErrorAuth, async (req: Request<{}, {}, ILogin>, res: Response) => {
	let { loginOrEmail, password } = req.body;
	let user = await AuthService.login(loginOrEmail, password);


	if (!user) {
		res.sendStatus(401);
		return
	}

	if(!user.emailConfirmation.isConfirmed) {
		res.sendStatus(401);
		return
	}

	if(!user.emailConfirmation.isConfirmed) {
		res.sendStatus(401);
		return
	}

	const accessToken = await ServiceJWT.addJWT(user);

	if (!accessToken) {
		res.sendStatus(401);
		return
	}

	res.send({ accessToken });
})

routerAuth.post('/registration', userValidator, checkError, async (req: Request<{}, {}, IRegistration>, res: Response) => {
	let { login, password, email } = req.body;
	let result = await AuthService.registration(login,  email, password);

	if(!result){
		res.status(400).send({
			"message": "Не удалось зарегистрироваться",
      "field": "email"
		})
		return;
	} 

	res.sendStatus(204); 
})

routerAuth.post('/registration-confirmation', async (req: Request<{}, {}, {code: string}>, res: Response) => {
	let { code } = req.body;
	let result = await AuthService.confirmCode(code);

	if(!result){
		res.status(400).send({
			"message": "Не удалось зарегистрироваться",
      "field": "email"
		})
		return;
	} 

	res.sendStatus(204);
})

routerAuth.post('/registration-email-resending', async (req: Request<{}, {}, {email: string}>, res: Response) => {
	let { email } = req.body;
	let result = await AuthService.confirmResending(email);

	if(!result){
		res.status(400).send({
			"message": "Не удалось зарегистрироваться",
      "field": "email"
		})
		return;
	} 

	res.sendStatus(204);
})