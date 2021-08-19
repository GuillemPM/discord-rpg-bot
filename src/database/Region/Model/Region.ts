import { DataTypes, Model, Sequelize } from 'sequelize';
import { RegionAttributes, RegionCreationAttributes } from '../RegionAttributes';


export class Region extends Model< RegionAttributes,RegionCreationAttributes > implements RegionAttributes {
  public Id!: number;
  public Name!: string;
  public RecommendedLevel!: number;

  public static initialize(sequelize: Sequelize) {
    this.init({
      Id: {
        type: DataTypes.INTEGER,
        primaryKey: true
      },
      Name: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Null'
      },
      RecommendedLevel: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      }
    },
    {
      timestamps: false,
      sequelize
    })
  }
};
