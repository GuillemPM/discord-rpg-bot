import { DataTypes, Model, Sequelize } from 'sequelize';
import { MobTypesAttributes } from '../MobTypesAttributes';

export class MobTypes extends Model< MobTypesAttributes > implements MobTypes {
  public id!: number;
  public name!: string;
  public strongAgainst!: string;
  public weakAgainst!: string;

  public static initialize(sequelize: Sequelize) {
    this.init({
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      strongAgainst: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      weakAgainst: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    },
    {
      timestamps: false,
      sequelize
    })
  }
};
