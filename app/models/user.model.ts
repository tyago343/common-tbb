import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/database";
import { Client } from "./client.model";
import { Entry } from "./entry.model";
export interface UserAttributes {
  id?: number;
  username: string;
  email: string;
  password: string;
  admin: boolean;
}
export class User extends Model<UserAttributes> implements UserAttributes {
  public id?: number;
  public username!: string;
  public email!: string;
  public password!: string;
  public admin!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    admin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,
  }
);
User.belongsToMany(Entry, { through: "user_projects" });
Entry.belongsToMany(User, { through: "user_projects" });
Client.hasMany(Entry);

User.sync({ force: true }).then(() =>
  console.log("User table created :D -------/")
);
