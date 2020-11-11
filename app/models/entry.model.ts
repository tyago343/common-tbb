import {
  AllowNull,
  AutoIncrement,
  Column,
  NotEmpty,
  PrimaryKey,
  Table,
  BelongsTo,
  Model,
  ForeignKey,
} from "sequelize-typescript";
import Client from "./client.model";
export interface IEntry {
  id?: number | null;
  clientId: number;
  client: Client;
  application?: string;
  url?: string;
  login: string;
  password: string;
  notes?: string;
}

@Table({
  tableName: "entry",
  timestamps: true,
})
export default class Entry extends Model<Entry> implements IEntry {
  @AutoIncrement
  @PrimaryKey
  @Column
  id?: number;
  @AllowNull(true)
  @ForeignKey(() => Client)
  @Column
  clientId!: number;
  @BelongsTo(() => Client)
  client!: Client;
  @AllowNull(true)
  @Column
  application?: string;
  @AllowNull(true)
  @Column
  url?: string;
  @AllowNull(false)
  @NotEmpty
  @Column
  login!: string;
  @AllowNull(false)
  @NotEmpty
  @Column
  password!: string;
  @AllowNull(true)
  @Column
  notes?: string;
}
