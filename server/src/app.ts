import express, { Application, Request, Response } from 'express';
const app: Application = express();

app.get('/', (req: Request, res: Response) => {
  res.send('Hello From Node Typescript Clean Template Application!');
});

export default app;
