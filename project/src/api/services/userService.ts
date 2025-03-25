import bcrypt from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import User from '../models/User';
import UserRepository from '../repositories/userRepository';
import AppError from '../middlewares/AppError';
import { instanceToInstance } from 'class-transformer';

interface IRequest {
  name: string;
  birth: Date;
  email: string;
  password: string;
}

class UserService {
  public async create({
    name,
    birth,
    email,
    password,
  }: IRequest): Promise<User> {
    const userRepository = getCustomRepository(UserRepository);

    const emailExists = await userRepository.findByMail(email);
    if (emailExists) {
      throw new AppError(
        'The email has already been registered.',
        'bad request',
        400,
      );
    }

    const user = userRepository.create({
      name,
      birth,
      email,
      password,
    });

    await userRepository.save(user);
    return instanceToInstance(user);
  }

  public async list({
    name,
    birth,
    email,
    password,
  }: IRequest): Promise<User[]> {
    const userRepository = getCustomRepository(UserRepository);

    const users = await userRepository.find();

    return instanceToInstance(users);
  }

  public async update({
    id,
    name,
    birth,
    email,
    password,
  }: IRequest & { id: string }): Promise<User> {
    const userRepository = getCustomRepository(UserRepository);

    const userId = Number(id);
    const user = await userRepository.findById(userId);

    if (!user) {
      throw new AppError('User not found.', 'bad request', 404);
    }

    if (password) {
      user.password = password;
    }

    user.name = name;
    user.birth = birth;
    user.email = email;

    await userRepository.save(user);
    return instanceToInstance(user);
  }

  public async delete({ id }: IRequest): Promise<void> {
    const userRepository = getCustomRepository(UserRepository);

    const user = await userRepository.findById(id);

    if (!user) {
      throw new AppError('User not found.', 'bad request', 404);
    }

    await userRepository.remove(user);
  }
}

export default UserService;
