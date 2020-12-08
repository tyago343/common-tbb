import { Model, DataTypes } from "sequelize";
import { sequelize } from "../app";

interface ClientAttributes {
  id: number;
  name: string;
}
class Client extends Model<ClientAttributes> implements ClientAttributes {
  public id!: number;
  public name!: string;
}
Client.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
  },
  {
    tableName: "clients",
    sequelize,
  }
);

export default Client;
