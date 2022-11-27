import { body } from "express-validator";

const checkEmail = (email: string) => {
	let pattern = new RegExp('^[\w\.]+@([\w-]+\.)+[\w-]{2,4}$');
	return pattern.test(email);
} 

export const loginValidator = [
	body("loginOrEmail").isString().isLength({min: 3, max: 10}).withMessage("KJuby должен быть от 3 до 10 символов"),
	body("password").isString().isLength({min: 6, max: 20}).withMessage("Пароль должен быть от 6 до 20 символов"),
]

export const userValidator = [
	body("login").isString().isLength({min: 3, max: 10}).withMessage("login должен быть от 3 до 10 символов"),
	body("password").isString().isLength({min: 6, max: 20}).withMessage("Пароль должен быть от 6 до 20 символов"),
	body("email").isString().isEmail().withMessage("Укажите валидный email"),
];