import { Optional } from "sequelize/types";

export interface AdvancedStatsAttributes {
  avatarId: string;
  hp: number;
  mp: number;
  physicDmg: number;
  magicDmg: number;
  speed: number;
  evasionPct: number;
  weight: number;
}

export interface AdvancedStatsCreationAttributes extends Optional<AdvancedStatsAttributes, null> { }