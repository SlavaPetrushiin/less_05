import { routerAuth } from './routers/authRouter';
import { routerUsers } from './routers/usersRouter';
import express, {Request, Response, NextFunction} from 'express';
import { runDB } from './repositories/db';
import { routerBlogs } from './routers/blogRouter';
import { routerPosts } from './routers/postsRouter';
import { routerTesting } from './routers/tetstingRouter';
import { routerComments } from './routers/commentsRouter';

const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

app.use('/auth', routerAuth);
app.use('/users', routerUsers);
app.use('/posts', routerPosts);
app.use('/blogs', routerBlogs);
app.use('/comments', routerComments);
app.use('/testing', routerTesting);

app.use((req: Request, res: Response) => {
  res.type('text/plain');
  res.status(404);
  res.send('404 - Не найдено');
})

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.type('text/plain');
  res.status(500);
  res.send('500 - Ошибка сервера');
})

const startApp =async () => {
  await runDB();

  app.listen(port, async () => {
    console.log(`Example app listening on port ${port}`);
  })
}

startApp();