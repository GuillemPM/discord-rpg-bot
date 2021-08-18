import { Association, DataTypes, HasManyCreateAssociationMixin, Model, Sequelize } from 'sequelize';
import { AdvancedStats } from '../../AdvancedStats/Model/AdvancedStats';
import { Gear } from '../../Gear/Model/Gear';
import { MainStats } from '../../MainStats/Model/MainStats';
import { AvatarAttributes, AvatarCreationAttributes } from '../AvatarAttributes';

export class Avatar extends Model<AvatarAttributes, AvatarCreationAttributes> implements AvatarAttributes {
  public id!: string;
  public username!: string;
  public connected!: boolean;
  public experience!: number;

  public readonly currentLevel!: number;
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
      },
      experience: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 0,
          max: 216000
        }
      },
      currentLevel: {
        type: DataTypes.VIRTUAL,
        get(this: Avatar): number {
          return Math.floor(Math.pow(this.getDataValue('experience'), 1/3)) || 1
        },
        set(){
          throw Error('a');          
        }
      }
    },{
        sequelize
      });
  }
  
  public readonly mainStats: MainStats;
  public readonly advancedStats: AdvancedStats;
  public readonly gear: Gear;

  public static associations: {
    mainStats: Association<Avatar, MainStats>;
    advancedStats: Association<Avatar, AdvancedStats>;
    gear: Association<Avatar, Gear>;
  };
};
