import { Model, DataTypes } from "sequelize";
import { sequelize } from "../app";

interface EntryAttributes {
  id: number;
  application: string;
  url: string;
  login: string;
  password: string;
  notes: string;
}
class Entry extends Model<EntryAttributes> implements EntryAttributes {
  public id!: number;
  public application!: string;
  public url!: string;
  public login!: string;
  public password!: string;
  public notes!: string;
}
Entry.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
  {
    tableName: "entries",
    sequelize,
  }
);
export default Entry;
