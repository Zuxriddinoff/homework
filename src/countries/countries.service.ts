import { Injectable } from '@nestjs/common';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Country } from './models/countries.model';
import { User } from 'src/user/models/user.model';

@Injectable()
export class CountriesService {
  constructor(
    @InjectModel(Country) private model: typeof Country
  ){ }

  async create(createCountryDto: CreateCountryDto) {
    const country = await this.model.create({...createCountryDto})
    return country
  }

  findAll() {
    return this.model.findAll({include:{model:User}})
  }

  async findOne(id: number) {
    const country = await this.model.findByPk(id, {include:{model:User}})
    if(!country){
      return {
        statusCode:404,
        message:`Country not found by id ${id}`
      }
    }
    return country
  }

  async update(id: number, updateCountryDto: UpdateCountryDto) {
    const country = await this.model.update(updateCountryDto, {where:{id}, returning:true})
    if(!country){
      return {
        statusCode:404,
        message:`Country not found by id ${id}`
      }
    }
    return country[1][0]
  }

  async remove(id: number) {
    await this.model.destroy({where:{id}})
    return {data:{}}
  }
}
