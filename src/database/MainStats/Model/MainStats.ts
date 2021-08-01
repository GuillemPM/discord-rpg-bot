import { Association, DataTypes, Model, Sequelize } from 'sequelize';
import { MainStatsAttributes, MainStatsCreationAttributes } from '../MainStatsAttributes';

export class MainStats extends Model<MainStatsAttributes, MainStatsCreationAttributes> implements MainStatsAttributes {
  public avatar_id!: string;
  public strength!: number;
  public dexterity!: number;
  public intelligence!: number;
  public constitution!: number;

  public static initialize(sequelize: Sequelize) {
    this.init({
      avatar_id: {
        type: DataTypes.STRING,
        primaryKey: true
      },
      strength: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      dexterity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      intelligence: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      constitution: {
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
