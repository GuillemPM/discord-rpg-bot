import { Optional } from "sequelize/types";

export interface MainStatsAttributes {
  avatarId: string;
  strength: number;
  dexterity: number;
  intelligence: number;
  constitution: number;
}

export interface MainStatsCreationAttributes extends Optional<MainStatsAttributes, null> { }