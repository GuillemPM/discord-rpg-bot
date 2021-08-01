import { Association, DataTypes, Model, Sequelize } from 'sequelize';
import { Item } from '../../Item/Model/Item';
import { GearInventoryAttributes, GearInventoryCreationAttributes } from '../GearInventoryAttributes';

export class GearInventory extends Model<GearInventoryAttributes, GearInventoryCreationAttributes> implements GearInventoryAttributes {
  public avatarId!: string;
  public itemId!: number;
  public instanceItemGuid!: string;

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
      instanceItemGuid: {
        type: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
      }
    },
    {
      timestamps: false,
      sequelize
    })
  }

  public readonly item: Item;

  public static associations: {
    item: Association<GearInventory, Item>;
  };
};