import { Optional } from "sequelize/types";
import { MainStats } from "../MainStats/Model/MainStats";

export interface AvatarAttributes {
  id: string;
  username: string;
  connected: boolean;
}

export interface AvatarCreationAttributes extends Optional<AvatarAttributes, 'connected'> { }