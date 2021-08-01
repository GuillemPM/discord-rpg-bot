import { Association, DataTypes, Model, Sequelize } from 'sequelize';
import { Item } from '../../Item/Model/Item';
import { InventoryAttributes, InventoryCreationAttributes } from '../InventoryAttributes';

export class Inventory extends Model<InventoryAttributes, InventoryCreationAttributes> implements InventoryAttributes {
  public avatarId!: string;
  public itemId!: number;
  public quantity!: number;

  public static initialize(sequelize: Sequelize) {
    this.init({
      avatarId:{
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      itemId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      }
    },
    {
      timestamps: false,
      sequelize
    })
  }

  public readonly item: Item;

  public static associations: {
    item: Association<Inventory, Item>;
  };
};