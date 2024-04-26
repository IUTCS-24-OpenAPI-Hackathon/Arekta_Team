import express, { Application, Request, Response } from 'express';
import geoRoutes from './routes/geo.route';
import cors from 'cors';
import userRoutes from './routes/user.route';
const app: Application = express();

/*-------------------------MIDDLEWARE-------------------------*/
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: '*' }));

/*-------------APPLICATION ROOT-------------*/
app.get('/', (req: Request, res: Response) => {
  res.send('Hello From Arekta Team!');
});

/*-----------------GEO API-----------------*/
app.use('/api/v1', geoRoutes);

/*-----------------USER ROUTE-----------------*/
app.use('/api/v1', userRoutes);

export default app;
