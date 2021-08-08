import { Association, DataTypes, Model, Sequelize } from 'sequelize';
import { Avatar } from '../../Avatar/Model/Avatar';
import { Inventory } from '../../Inventory/Model/Inventory';
import { GearAttributes, GearCreationAttributes } from '../GearAttributes';

export class Gear extends Model<GearAttributes, GearCreationAttributes> implements GearAttributes {
    public avatarId: string;
    public leftHandWeapon: string;
    public rightHandWeapon: string;
    public head: string;
    public chest: string;
    public hands: string;
    public legs: string;
    public feet: string;
    public leftEar: string;
    public rightEar: string;
    public rightHandFinger: string;
    public leftHandFinger: string;
    public neck: string;
    public waist: string;

    public static initialize(sequelize: Sequelize) {
        this.init({
            avatarId: {
                type: DataTypes.STRING,
                primaryKey: true
            },
            leftHandWeapon: {
                type: DataTypes.UUIDV4
            },
            rightHandWeapon: {
                type: DataTypes.UUIDV4
            },
            head: {
                type: DataTypes.UUIDV4
            },
            chest: {
                type: DataTypes.UUIDV4
            },
            hands: {
                type: DataTypes.UUIDV4
            },
            legs: {
                type: DataTypes.UUIDV4
            },
            feet: {
                type: DataTypes.UUIDV4
            },
            leftEar: {
                type: DataTypes.UUIDV4
            },
            rightEar: {
                type: DataTypes.UUIDV4
            },
            rightHandFinger: {
                type: DataTypes.UUIDV4
            },
            leftHandFinger: {
                type: DataTypes.UUIDV4
            },
            neck: {
                type: DataTypes.UUIDV4
            },
            waist: {
                type: DataTypes.UUIDV4
            }
        },
            {
                timestamps: false,
                sequelize
            })
    }

    public readonly avatar: Avatar;
    public readonly inventory: Inventory;

    public static associations: {
        avatar: Association<Gear, Avatar>;
        inventory: Association<Gear, Inventory>;
    };
};