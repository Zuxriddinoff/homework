import { Table, Column, DataType, Model } from 'sequelize-typescript';

@Table({ tableName: 'user' })
export class User extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  full_name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  phone: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.ENUM('superadmin', 'admin', 'teacher', 'student'),
    allowNull: false,
  })
  role: string;
}
