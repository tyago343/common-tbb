import {
  AllowNull,
  AutoIncrement,
  Column,
  NotEmpty,
  PrimaryKey,
  Table,
  Model,
} from "sequelize-typescript";

export interface IUser {
  id?: number | null;
  username: string;
  email: string;
  password: string;
  permissions: string;
}

@Table({
  tableName: "user",
  timestamps: true,
})
export default class User extends Model implements IUser {
  @AutoIncrement
  @PrimaryKey
  @Column
  id?: number;
  @AllowNull(false)
  @NotEmpty
  @Column
  username!: string;
  @AllowNull(false)
  @NotEmpty
  @Column
  email!: string;
  @AllowNull(false)
  @NotEmpty
  @Column
  password!: string;
  @AllowNull(false)
  @NotEmpty
  @Column
  permissions!: string;
}
