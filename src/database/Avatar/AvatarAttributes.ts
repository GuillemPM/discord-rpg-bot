import { Optional } from "sequelize/types";

export interface AvatarAttributes {
  id: string;
  username: string;
  connected: boolean;
  experience: number;
  currentLevel: number;
}

export interface AvatarCreationAttributes extends Optional<AvatarAttributes, 'connected'> { }