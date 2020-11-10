import {
  AllowNull,
  AutoIncrement,
  Column,
  NotEmpty,
  PrimaryKey,
  Table,
  Model,
  BelongsToMany,
  Scopes,
} from "sequelize-typescript";
import Role from "./role.model";
import { UserRole } from "./UserRole";
export interface IUser {
  id?: number | null;
  username: string;
  email: string;
  password: string;
  role: Role[];
}

@Scopes(() => ({
  role: {
    include: [
      {
        model: Role,
        through: { attributes: [] },
      },
    ],
  },
}))
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
  @BelongsToMany(() => Role, () => UserRole)
  role!: Role[];
}
