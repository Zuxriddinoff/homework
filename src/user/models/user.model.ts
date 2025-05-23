import { Column, Table, Model, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Country } from "src/countries/models/countries.model";

@Table({tableName:'users'})
export class User extends Model{
    @Column({
        type:DataType.STRING,
        allowNull:false
    })
    firstName:string;

    @Column({
        type:DataType.STRING,
        allowNull:false
    })
    lastName:string;

    @Column({
        type:DataType.INTEGER,
        allowNull:false
    })
    age:number;

    @ForeignKey(() => Country)
    @Column({
        type:DataType.INTEGER,
        allowNull:false
    })
    countryId:number;

    @BelongsTo(() => Country, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    country:Country
}