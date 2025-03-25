import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import UserController from '../api/controllers/userController';

const cadRouter = Router();
const userController = new UserController();

cadRouter.get('/', userController.list);

cadRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      birth: Joi.date().required(),
      email: Joi.string().required().email(),
      password: Joi.string().required().min(6),
    },
  }),
  userController.create,
);

cadRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string(),
      birth: Joi.date(),
      email: Joi.string().email(),
      password: Joi.string().min(6),
    },
  }),
  userController.update,
);

cadRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.required(),
    },
  }),
  userController.delete,
);
export default cadRouter;
