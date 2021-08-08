import { Association, DataTypes, Model, Sequelize } from 'sequelize';
import { BodyPart } from '../../BodyPart/Model/BodyPart';
import { ItemSubtype } from '../../ItemSubtype/Model/ItemSubtype';
import { ItemType } from '../../ItemType/Model/ItemType';
import { ItemAttributes, ItemCreationAttributes } from '../ItemAttributes';

export class Item extends Model<ItemAttributes, ItemCreationAttributes> implements ItemAttributes {
  public id!: number;
  public name!: string;
  public description!: string;
  public itemTypeId!: number;
  public itemSubtypeId!: number;
  public bodyPartId!: number;
  
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
      },
      bodyPartId: {
        type: DataTypes.INTEGER,
        references: {
          model: BodyPart,
          key: 'id'
        }     
      }
    },
    {
      timestamps: false,
      sequelize
    })
  }

  public readonly itemType: ItemType;
  public readonly itemSubtype: ItemSubtype;
  public readonly bodyPart: BodyPart;

  public static associations: {
    itemType: Association<Item, ItemType>
    itemSubtype: Association<Item, ItemSubtype>;
    bodyPart: Association<Item, BodyPart>
  };
};
