import { Association, DataTypes, Model, Sequelize } from 'sequelize';
import { AdvancedStats } from '../../AdvancedStats/Model/AdvancedStats';
import { Gear } from '../../Gear/Model/Gear';
import { MainStatsAttributes } from '../../MainStats/MainStatsAttributes';
import { getAdvancedStatsToIncrement } from '../../MainStats/MainStatsMapper';
import { MainStats } from '../../MainStats/Model/MainStats';
import { AvatarAttributes, AvatarCreationAttributes } from '../AvatarAttributes';

export class Avatar extends Model<AvatarAttributes, AvatarCreationAttributes> implements AvatarAttributes {
  public id!: string;
  public username!: string;
  public connected!: boolean;
  public currentEnergy!: number;
  public maxEnergy!: number;
  public level!: number;
  public totalExp!: number;
  public requiredExp!: number;
  public assignedAttributePoints!: number;
  public attributePoints!: number;

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
      currentEnergy: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      maxEnergy: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      level: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
      },
      totalExp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      requiredExp: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      assignedAttributePoints: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isLessOrEqualThanAttributePoints(value: number) {
            if (value < 0 || value > this.attributePoints) {
              throw new Error('Bar must be greater than otherField.');
            }
          }
        }
      },
      attributePoints: {
        type: DataTypes.INTEGER,
        allowNull: false
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

  public addAttributePoint = (name: string, points: number) => {
    const avatar: Avatar = <Avatar>this.get({ plain: true })
    
    Avatar.increment({ 
      assignedAttributePoints: points
    },
      {
        where: {
        id: avatar.id
      }
    })

    MainStats.increment(<keyof MainStatsAttributes>name, {
      by: points,
      where: {
        avatarId: avatar.id
      }
    })
    .then(() => {
      getAdvancedStatsToIncrement(name).map((value, key) => {
        AdvancedStats.increment(key, {
          by: points * value,
          where: {
            avatarId: avatar.id
          }
        })
      })
    })
  } 

  public addExperience(this: this, xp: number) {
    const avatar: Avatar = <Avatar>this.get({ plain: true })

    avatar.totalExp += xp;

    while (avatar.totalExp >= avatar.requiredExp) {
      avatar.level++;
      avatar.requiredExp = Math.pow(avatar.level + 1, 3)
       avatar.attributePoints += 4;
    }

    Avatar.update({ 
      level: avatar.level,
      totalExp: avatar.totalExp,
      requiredExp: avatar.requiredExp,
      attributePoints: avatar.attributePoints
    },
      {
        where: {
        id: avatar.id
      }
    })
  }
};
