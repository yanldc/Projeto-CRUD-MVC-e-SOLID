import { Router } from 'express';
import cadRouter from './cadRouter';

const routes = Router();

routes.use('/cad', cadRouter);

export default routes;
