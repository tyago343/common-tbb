import {
  Model,
  DataTypes,
  HasManyGetAssociationsMixin,
  Association,
} from "sequelize";
import { sequelize } from "../app";
import Entry from "./entry.model";
import Client from "./client.model";
interface UserAttributes {
  id?: number;
  username: string;
  email: string;
  password: string;
  admin: boolean;
}
class User extends Model<UserAttributes> implements UserAttributes {
  public id?: number;
  public username!: string;
  public email!: string;
  public password!: string;
  public admin!: boolean;
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
    tableName: "users",
    sequelize,
  }
);
User.belongsToMany(Entry, { through: "user_projects" });
Entry.belongsToMany(User, { through: "user_projects" });
Client.hasMany(Entry, {
  sourceKey: "id",
  foreignKey: "ownerId",
  as: "entries",
});
export default User;
