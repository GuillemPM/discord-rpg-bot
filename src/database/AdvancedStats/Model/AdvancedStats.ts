import { Association, DataTypes, Model, Sequelize } from 'sequelize';
import { AdvancedStatsAttributes, AdvancedStatsCreationAttributes } from '../AdvancedStatsAttributes';

export class AdvancedStats extends Model<AdvancedStatsAttributes, AdvancedStatsCreationAttributes> implements AdvancedStatsAttributes {
  public avatarId!: string;
  public hp!: number;
  public mp!: number;
  public missingHp: number;
  public missingMp: number;
  public physicDmg!: number;
  public magicDmg!: number;
  public speed!: number;
  public evasionPct!: number;
  public weight!: number;

  public static initialize(sequelize: Sequelize) {
    this.init({
      avatarId: {
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
      missingHp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      missingMp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      physicDmg: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 20
      },
      magicDmg: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 20,
      },
      speed: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 10
      },
      evasionPct: {
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
