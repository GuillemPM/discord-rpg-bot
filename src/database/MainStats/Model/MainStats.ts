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
        type: new DataTypes.INTEGER,
        allowNull: false
      },
      dexterity: {
        type: new DataTypes.INTEGER,
        allowNull: false,
      },
      intelligence: {
        type: new DataTypes.INTEGER,
        allowNull: false,
      },
      constitution: {
        type: new DataTypes.INTEGER,
        allowNull: false,
      }
    },
    {
      timestamps: false,
      sequelize
    })
  }
};
