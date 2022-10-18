import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import morganMiddleware from './src/middleware/logger';
import { errorHandler } from './src/middleware/errorHandler';
import routes from './src/routes/imageRouter';

dotenv.config();

const app = express();

app.use(express.json());

//use logging
app.use(morganMiddleware);

app.use('/api', routes);

app.get('/', (req: Request, res: Response): void => {
  res.send('Welcome to the home page! Enter the image filename, width and height in the URL ');
});

app.get('*', (req: Request, res: Response): void => {
  res.status(404).send('Not Found!');
});

app.use(errorHandler);

export default app;