import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { Country } from 'src/countries/models/countries.model';

@Injectable()
export class UserService {

  constructor(
    @InjectModel(User) private model:typeof User
  ){ }

  async create(createUserDto: CreateUserDto) {
    const user = await this.model.create({...createUserDto})
    return user
  }

  async findAll() {
    const user = await this.model.findAll({include:{model:Country}})
    return user
  }

  async findOne(id: number) {
    const user = await this.model.findByPk(id, {include:{model:Country}})
    if(!user){
      return {
        statusCode:404,
        message:`user not found by ID ${id}`
      }
    }
    return user
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user  = await this.model.update(updateUserDto, {where:{id}, returning:true})
    return user[1][0]  
  } 

  async remove(id: number) {
    await this.model.destroy({where:{id}})
    return {data:{}}
  }
}
