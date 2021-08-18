import { Association, DataTypes, Model, Sequelize } from 'sequelize';
import { Item } from '../../Item/Model/Item';
import { WeaponBaseStatsAttributes, WeaponBaseStatsCreationAttributes } from '../WeaponBaseStatsAttributes';

export class WeaponBaseStats extends Model<WeaponBaseStatsAttributes, WeaponBaseStatsCreationAttributes> implements WeaponBaseStatsAttributes {
  public itemId!: number;
  public physicDmg!: number;
  public magicDmg!: number;
  public speed!: number;

  public static initialize(sequelize: Sequelize) {
    this.init({
      itemId: {
        type: DataTypes.INTEGER,
        primaryKey: true
      },
      physicDmg: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      magicDmg: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      speed: {
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
    item: Association<WeaponBaseStats, Item>;
  };
};
