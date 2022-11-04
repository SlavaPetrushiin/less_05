import { checkBlogID } from './postsValidator';
import { body, CustomValidator, param } from "express-validator";

const  checkUrl: CustomValidator =(url: string) => {
	let pattern = new RegExp('^https://([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$');
	return pattern.test(url);
}

export const createAndUpdateBlogValidator = [
	body("name").isString().trim().isLength({min: 1, max: 15}).withMessage("Укажите имя"),
	body("youtubeUrl").isString().trim().isLength({min: 1, max: 100}).custom(checkUrl).withMessage("Укажите валидную ссылку"),
];

export const checkBlogValidator = [
	body("title").isString().trim().isLength({min: 1, max: 30}).withMessage("Укажите заголовок"),
	body("shortDescription").trim().isString().isLength({min: 1, max: 100}).withMessage("Укажите краткое описание"),
	body("content").isString().trim().isLength({min: 1, max: 1000}).withMessage("Напишите пост"),
]

export const isExistsBlogValidator = [
	param("id").custom(checkBlogID).withMessage("Блога не существет"),
]
