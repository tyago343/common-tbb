import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/database";

export interface EntryAttributes {
  id: number;
  application: string;
  url: string;
  login: string;
  password: string;
  notes: string;
}
export class Entry extends Model<EntryAttributes> implements EntryAttributes {
  public id!: number;
  public application!: string;
  public url!: string;
  public login!: string;
  public password!: string;
  public notes!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}
Entry.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    application: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    login: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    notes: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  { sequelize }
);
Entry.sync().then(() => console.log("Entry table created :D --------/"));
