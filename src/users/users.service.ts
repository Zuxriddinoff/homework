import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private model: typeof User) {}
  async create(createUserDto: CreateUserDto) {
    const newUser = await this.model.create({ ...createUserDto });
    return newUser;
  }

  async findAll() {
    return this.model.findAll();
  }

  async findOne(id: number) {
    const user = await this.model.findByPk(id);

    return !user
      ? { statusCode: 404, message: `User with ID ${id} not found` }
      : { statusCode: 200, message: 'success', data: user };
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const [count, updatedRows] = await this.model.update(updateUserDto, {
      where: { id },
      returning: true,
    });

    return count === 0
      ? { statusCode: 400, message: `User not found or updated` }
      : { statusCode: 200, message: 'success', data: updatedRows[0] };
  }

  async remove(id: number) {
    const user = await this.model.destroy({ where: { id } });
    return user === 0
      ? { statusCode: 400, message: 'User not found or not deleted' }
      : { statusCode: 200, message: 'success', data: {} };
  }
}
