import { Blob } from 'buffer';
import { DataTypes, Model, Sequelize } from 'sequelize';
import { CombatAttributes } from '../CombatAttributes';



export class Combat extends Model<CombatAttributes > implements CombatAttributes {
    public combatId: string;
    public avatarId: string;
    public mobId: string;

    public static initialize(sequelize: Sequelize) {
        this.init({
          combatId: {
           type: DataTypes.STRING,
           primaryKey: true
          },
          avatarId: {
           type: DataTypes.STRING,
           primaryKey: true
          },
          mobId: {
            type: DataTypes.STRING,
            primaryKey: false
          },
        },{
          timestamps: false,
          sequelize
      })
    };
};