import { Association, DataTypes, Model, Sequelize } from 'sequelize';
import { Item } from '../../Item/Model/Item';
import { BodyPartAttributes, BodyPartCreationAttributes } from '../BodyPartAttributes';

export class BodyPart extends Model<BodyPartAttributes, BodyPartCreationAttributes> implements BodyPartAttributes {
  public id!: number;
  public name!: string;
  public description!: string;
  
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
      }
    },
    {
      timestamps: false,
      sequelize
    })
  }

  public readonly item: Item[];

  public static associations: {
    item: Association<BodyPart, Item>;
  };
};
