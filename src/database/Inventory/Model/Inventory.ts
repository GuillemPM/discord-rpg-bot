import { Association, DataTypes, Model, Sequelize } from 'sequelize';
import { BodyPartEnum } from '../../BodyPart/BodyPartEnum';
import { Gear } from '../../Gear/Model/Gear';
import { Item } from '../../Item/Model/Item';
import { InventoryAttributes, InventoryCreationAttributes } from '../InventoryAttributes';

export class Inventory extends Model<InventoryAttributes, InventoryCreationAttributes> implements InventoryAttributes {
  public id!: number;
  public avatarId!: string;
  public itemId!: number;
  public instanceItemGuid: string;
  public quantity!: number;
  public equiped!: boolean;

  public static initialize(sequelize: Sequelize) {
    this.init({
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true
      },
      avatarId:{
        type: DataTypes.STRING,
        primaryKey: true
      },
      itemId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      instanceItemGuid: {
        type: DataTypes.UUIDV4
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      equiped: {
        type: DataTypes.BOOLEAN,
        allowNull: false
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