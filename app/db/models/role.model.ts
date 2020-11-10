import {
  AllowNull,
  AutoIncrement,
  Column,
  NotEmpty,
  PrimaryKey,
  Table,
  Model,
} from "sequelize-typescript";

export interface IRole {
  id?: number | null;
  projects: boolean;
  admin: boolean;
}

@Table({
  tableName: "role",
  timestamps: true,
})
export default class Role extends Model implements IRole {
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
}
