import { Optional } from "sequelize/types";

export interface AvatarAttributes {
  id: string;
  username: string;
  connected: boolean;
  currentEnergy: number;
  maxEnergy: number;
  level: number;
  totalExp: number;
  requiredExp: number;
  assignedAttributePoints: number;
  attributePoints: number;
}

export interface AvatarCreationAttributes extends Optional<AvatarAttributes, 'connected'> { }