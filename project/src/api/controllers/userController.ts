import { Request, Response } from 'express';
import UserService from '../services/userService';
import { instanceToInstance } from 'class-transformer';

export default class UserController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, birth, email, password } = request.body;

    const userService = new UserService();
    const user = await userService.create({
      name,
      birth,
      email,
      password,
    });

    return response.status(201).json(instanceToInstance(user));
  }

  public async list(request: Request, response: Response): Promise<Response> {
    const { name, birth, email, password } = request.query;

    const userService = new UserService();
    const users = await userService.list({ name, birth, email, password });

    return response.status(200).json(users);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name, birth, email, password } = request.body;
    const { id } = request.params;

    const userService = new UserService();

    const user = await userService.update({
      id,
      name,
      birth,
      email,
      password,
    });

    return response.json(user);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const userService = new UserService();

    await userService.delete({ id });

    return response.json([]);
  }
}
