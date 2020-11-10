import {
  AllowNull,
  AutoIncrement,
  Column,
  NotEmpty,
  PrimaryKey,
  Table,
  Model,
  Scopes,
} from "sequelize-typescript";
import Client from "./client.model";
export interface IEntry {
  id?: number | null;
  client?: Client;
  application?: string;
  url?: string;
  login: string;
  password: string;
  notes?: string;
}

@Scopes(() => ({
  client: {
    include: [
      {
        model: Client,
        through: { attributes: [] },
      },
    ],
  },
}))
@Table({
  tableName: "entry",
  timestamps: true,
})
export default class Entry extends Model implements IEntry {
  @AutoIncrement
  @PrimaryKey
  @Column
  id?: number;
  @AllowNull(true)
  @Column
  client?: Client;
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
