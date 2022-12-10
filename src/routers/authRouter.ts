import { checkBearerAuth } from './../utils/checkBearerAuth';
import { checkError, checkErrorAuth } from './../utils/checkError';
import express, { Request, Response } from 'express';
import { loginValidator, userValidator } from '../validators/usersValidator';
import { ServiceJWT } from '../services/jwt_service';
import { AuthService } from '../services/auth_service';
import { add } from 'date-fns';
import { verifyRefreshToken } from '../utils/verifyRefreshToken';
import { cookie } from 'express-validator';
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

const MILLISECONDS_IN_HOUR = 3600000;
const MAX_AGE_COOKIE_MILLISECONDS = 20_000;

routerAuth.get('/me', checkBearerAuth, async (req: Request<{}, {}, ILogin>, res: Response) => {
	let user = req.user;
	res.send(user);
})

routerAuth.post('/login', loginValidator, checkErrorAuth, async (req: Request<{}, {}, ILogin>, res: Response) => {
	let { loginOrEmail, password } = req.body;

	const ipAddress = req.ip;
	let user = await AuthService.login(loginOrEmail, password);


	if (!user) {
		res.sendStatus(401);
		return
	}
	const tokens = await ServiceJWT.updateRefreshToken(user.id, ipAddress);

	if (!tokens) {
		res.sendStatus(401);
		return;
	}

	return res.status(200)
						.cookie('refreshToken', tokens.refreshToken, { httpOnly: true, secure: true, maxAge: MAX_AGE_COOKIE_MILLISECONDS })
						.send({ accessToken: tokens.accessToken });
})

routerAuth.post('/registration', userValidator, checkError, async (req: Request<{}, {}, IRegistration>, res: Response) => {
	let { login, password, email } = req.body;
	let result = await AuthService.registration(login, email, password);

	if (!result) {
		res.sendStatus(400);
		return;
	}

	res.sendStatus(204);
})

routerAuth.post('/registration-confirmation', async (req: Request<{}, {}, { code: string }>, res: Response) => {
	let { code } = req.body;
	let result = await AuthService.confirmCode(code);
	if (!result) {
		res.status(400).send({
			"errorsMessages": [
				{
					"message": "Не валидный код",
					"field": "code"
				}
			]
		});
		return;
	}

	res.sendStatus(204);
})

routerAuth.post('/registration-email-resending', async (req: Request<{}, {}, { email: string }>, res: Response) => {
	let { email } = req.body;
	let result = await AuthService.confirmResending(email);

	if (!result) {
		res.status(400).send({
			"errorsMessages": [
				{
					"message": "Нет такого email",
					"field": "email"
				}
			]
		});
		return;
	}

	res.sendStatus(204);
})

routerAuth.post('/refresh-token', verifyRefreshToken, async (req: Request<{}, {}, { accessToken: string }>, res: Response) => {
	let user = req.user;
	const ipAddress = req.ip;

	let updatedTokens = await ServiceJWT.updateRefreshToken(user!.userId, ipAddress);

	if (!updatedTokens) {
		return res.sendStatus(401);
	}


	return  res.status(200)
		.cookie('refreshToken', updatedTokens.refreshToken, { httpOnly: true, secure: true, maxAge: MAX_AGE_COOKIE_MILLISECONDS })
		.send({ accessToken: updatedTokens.accessToken });
})

routerAuth.post('/logout', verifyRefreshToken, async (req: Request, res: Response) => {
	let user = req.user;

	if (!user) {
		return res.sendStatus(401);
	}

	let isLogout = await ServiceJWT.removeRefreshToken(user.userId);

	if (!isLogout) {
		return res.sendStatus(401);
	}

	delete req.cookies.refreshToken;
	res.sendStatus(204);
})