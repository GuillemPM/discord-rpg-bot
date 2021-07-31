import { Association, DataTypes, Model, Sequelize } from 'sequelize';
import { AdvancedStats } from '../../AdvancedStats/Model/AdvancedStats';
import { MainStats } from '../../MainStats/Model/MainStats';
import { AvatarAttributes, AvatarCreationAttributes } from '../AvatarAttributes';

export class Avatar extends Model<AvatarAttributes, AvatarCreationAttributes> implements AvatarAttributes {
  public id!: string;
  public username!: string;
  public connected!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static initialize(sequelize: Sequelize) {
    this.init({
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      username: {
        type: new DataTypes.STRING(128),
        allowNull: false,
      },
      connected: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }
    },
    { sequelize });
  }

  public readonly mainStats: MainStats;
  public readonly advancedStats: AdvancedStats;

  public static associations: {
    mainStats: Association<Avatar, MainStats>;
    advancedStats: Association<Avatar, AdvancedStats>;
  };
};
