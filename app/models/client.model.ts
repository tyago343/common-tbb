import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/database";

export interface ClientAttributes {
  id: number;
  name: string;
}
export class Client
  extends Model<ClientAttributes>
  implements ClientAttributes {
  public id!: number;
  public name!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
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
  { sequelize }
);
Client.sync().then(() => console.log("link table created :D -----/"));
