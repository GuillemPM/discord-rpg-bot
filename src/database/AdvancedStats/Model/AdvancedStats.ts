import { Association, DataTypes, Model, Sequelize } from 'sequelize';
import { AdvancedStatsAttributes, AdvancedStatsCreationAttributes } from '../AdvancedStatsAttributes';

export class AdvancedStats extends Model<AdvancedStatsAttributes, AdvancedStatsCreationAttributes> implements AdvancedStatsAttributes {
  public avatar_id!: string;
  public hp!: number;
  public mp!: number;
  public physic_dmg!: number;
  public magic_dmg!: number;
  public speed!: number;
  public evasion_pct!: number;
  public weight!: number;

  public static initialize(sequelize: Sequelize) {
    this.init({
      avatar_id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      hp: {
        type: new DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 100
      },
      mp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 100
      },
      physic_dmg: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 20
      },
      magic_dmg: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 20,
      },
      speed: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 10
      },
      evasion_pct: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 1.5
      },
      weight: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        defaultValue: 50
      }
    },
    { sequelize });
  }
};
