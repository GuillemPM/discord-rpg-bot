import { Optional } from "sequelize/types";

export interface AvatarAttributes {
  id: string;
  username: string;
  connected: boolean;
  experience: number;
  currentLevel: number;
  currentEnergy: number;
  maxEnergy: number;
  level: number;
}

export interface AvatarCreationAttributes extends Optional<AvatarAttributes, 'connected'> { }