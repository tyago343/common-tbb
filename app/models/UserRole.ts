import {
  Model,
  Column,
  Table,
  ForeignKey,
  PrimaryKey,
  BelongsTo,
} from "sequelize-typescript";
import User from "./user.model";
import Role from "./role.model";

@Table
export class UserRole extends Model<UserRole> {
  @BelongsTo(() => Role)
  role!: Role;

  @ForeignKey(() => Role)
  @PrimaryKey
  @Column
  roleId!: number;

  @BelongsTo(() => User)
  user!: User;

  @ForeignKey(() => User)
  @PrimaryKey
  @Column
  userId!: number;
}
