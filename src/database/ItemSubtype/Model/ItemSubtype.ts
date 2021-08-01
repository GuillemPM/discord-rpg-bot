import { Association, DataTypes, Model, Sequelize } from 'sequelize';
import { Item } from '../../Item/Model/Item';
import { ItemType } from '../../ItemType/Model/ItemType';
import { ItemSubtypeAttributes, ItemSubtypeCreationAttributes } from '../ItemSubtypeAttributes';

export class ItemSubtype extends Model<ItemSubtypeAttributes, ItemSubtypeCreationAttributes> implements ItemSubtypeAttributes {
  public id!: number;
  public name!: string;
  public description!: string;
  public itemTypeId!: number;
  
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
      }
    },
    {
      timestamps: false,
      sequelize
    })
  }

  public readonly itemType: ItemType;
  public readonly item: Item[];

  public static associations: {
    itemType: Association<ItemSubtype, ItemType>
    item: Association<ItemSubtype, Item>;
  };
};
