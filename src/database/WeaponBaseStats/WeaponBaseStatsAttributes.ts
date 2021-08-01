import { Optional } from "sequelize/types";

export interface WeaponBaseStatsAttributes {
  itemId: number;
  physicDmg: number;
  magicDmg: number;
  speed: number;
}

export interface WeaponsBaseStatsAttributes extends Optional<WeaponBaseStatsAttributes, null> { }