import { Association, DataTypes, Model, Sequelize } from 'sequelize';
import { ItemAttributes, ItemCreationAttributes } from '../ItemAttributes';

export class Item extends Model<ItemAttributes, ItemCreationAttributes> implements ItemAttributes {
  public id!: number;
  public name!: string;
  public description!: string;
  public itemTypeId!: number;
  public itemSubtypeId!: number;
  

  public static initialize(sequelize: Sequelize) {
    this.init({
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      itemTypeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      itemSubtypeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      }
    },
    {
      timestamps: false,
      sequelize
    })
  }
};
