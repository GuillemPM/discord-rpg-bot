import { Association, DataTypes, Model, Sequelize } from 'sequelize';
import { Item } from '../../Item/Model/Item';
import { ItemSubtype } from '../../ItemSubtype/Model/ItemSubtype';
import { ItemTypeAttributes, ItemTypeCreationAttributes } from '../ItemTypeAttributes';

export class ItemType extends Model<ItemTypeAttributes, ItemTypeCreationAttributes> implements ItemTypeAttributes {
  public id!: number;
  public name!: string;
  public description!: string;
  public icon!: string;

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
      icon: {
        type: DataTypes.STRING(20),
        allowNull: false
      }
    },
    {
      timestamps: false,
      sequelize
    })
  }

  public readonly itemSubtype: ItemSubtype[];
  public readonly item: Item[];

  public static associations: {
    itemSubtype: Association<ItemType, ItemSubtype>;
    item: Association<ItemType, Item>;
  };
};
