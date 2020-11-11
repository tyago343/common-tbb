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
import Entry from "./entry.model";
export interface IClient {
  id?: number | null;
  name: string;
  project?: Entry[];
}

@Table({
  tableName: "client",
  timestamps: true,
})
export default class Client extends Model<Client> implements IClient {
  @AutoIncrement
  @PrimaryKey
  @Column
  id?: number;
  @AllowNull(false)
  @NotEmpty
  @Column
  name!: string;
  @HasMany(() => Entry)
  entries?: Entry[];
}
