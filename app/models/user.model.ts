import {
  AllowNull,
  AutoIncrement,
  Column,
  NotEmpty,
  PrimaryKey,
  Table,
  Model,
  HasMany,
} from "sequelize-typescript";
import { UserRole } from "./UserRole";
export interface IUser {
  id?: number | null;
  username: string;
  email: string;
  password: string;
  roles: UserRole[];
}

@Table({
  tableName: "user",
  timestamps: true,
})
export default class User extends Model<User> implements IUser {
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

  @HasMany(() => UserRole)
  roles!: UserRole[];
}
