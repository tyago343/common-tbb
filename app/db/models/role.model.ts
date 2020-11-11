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

export interface IRole {
  id?: number | null;
  projects: boolean;
  admin: boolean;
  users: UserRole[];
}

@Table({
  tableName: "role",
  timestamps: true,
})
export default class Role extends Model<Role> implements IRole {
  @AutoIncrement
  @PrimaryKey
  @Column
  id?: number;
  @AllowNull(false)
  @NotEmpty
  @Column
  projects!: boolean;
  @AllowNull(false)
  @NotEmpty
  @Column
  admin!: boolean;

  @HasMany(() => UserRole)
  users!: UserRole[];
}
