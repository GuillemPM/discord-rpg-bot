import { DataTypes, Model, Sequelize } from 'sequelize';
import { MobsAttributes, MobsCreationAttributes } from '../mobsAttributes';

export class Mobs extends Model< MobsAttributes,MobsCreationAttributes > implements MobsAttributes {
  public mobId!: number;
  public mName!: string;
  public hp!: number;
  public attack!: number;
  public defense!: number;
  public speed!: number;
  public type!: number;

  public static initialize(sequelize: Sequelize) {
    this.init({
      mobId: {
        type: DataTypes.INTEGER,
        primaryKey: true
      },
      mName: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Null'
      },
      hp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      attack: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      defense: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      speed: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      type: {
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
