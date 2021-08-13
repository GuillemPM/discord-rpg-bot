import { Optional } from "sequelize/types";

export interface AdvancedStatsAttributes {
  avatarId: string;
  hp: number;
  mp: number;
  missingHp: number;
  missingMp: number;
  physicDmg: number;
  magicDmg: number;
  speed: number;
  evasionPct: number;
  weight: number;
}

export interface AdvancedStatsCreationAttributes extends Optional<AdvancedStatsAttributes, null> { }