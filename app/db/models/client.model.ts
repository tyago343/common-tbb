import {
  AllowNull,
  AutoIncrement,
  Column,
  NotEmpty,
  PrimaryKey,
  Table,
  Model,
} from "sequelize-typescript";
export interface IClient {
  id?: number | null;
  name: string;
}

@Table({
  tableName: "client",
  timestamps: true,
})
export default class Client extends Model implements IClient {
  @AutoIncrement
  @PrimaryKey
  @Column
  id?: number;
  @AllowNull(false)
  @NotEmpty
  @Column
  name!: string;
}
