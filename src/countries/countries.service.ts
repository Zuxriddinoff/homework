import { Injectable } from '@nestjs/common';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';
import { readData, writeData } from 'src/utils/file-control';
import { Country } from './entities/country.entity';

@Injectable()
export class CountriesService {
  create(createCountryDto: CreateCountryDto) {
    const countries = readData()
    const country = {id: !countries.length ? 1 : countries.at(-1).id + 1, ...createCountryDto}
    countries.push(country)
    writeData(countries)
    return {
      statusCode:201,
      message:'success',
      data:country
    }
  }

  findAll() {
    return {
      statusCode: 200,
      message:'success',
      data:readData()
    }
  }

  findOne(id: number) {
    const countries = readData()
    const country = countries.find((country:any) => country.id === id)
    if(!country){
      return {
        statusCode:404,
        message:`contry not found by ID ${id}`
      }
    }
    return {
      statusCode: 200,
      message:'success',
      data:country
    }
  }

  update(id: number, updateCountryDto: UpdateCountryDto) {
    const countries = readData()
    const index = countries.findIndex((country:any) => country.id === id)
    if(!index){
      return {
        statusCode:404,
        message:`contry not found by ID ${id}`
      }
    }
    countries[index] = {...countries[index], ...updateCountryDto}
    writeData(countries)
    return {
      statusCode: 200,
      message:'success',
      data:  countries[index]
    }
  }

  remove(id: number) {
    const countries = readData()
    const index = countries.findIndex((country:any) => country.id === id)
    if(!index){
      return {
        statusCode:404,
        message:`contry not found by ID ${id}`
      }
    }
    countries.splice(index, 1)
    writeData(countries)
    return {
      statusCode: 200,
      message:'success',
      data:{}
    }
  }
}
