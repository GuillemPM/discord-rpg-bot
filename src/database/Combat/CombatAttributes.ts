import { Optional } from "sequelize/types";

export interface CombatAttributes {
  combatId: string;
  avatarId: string;
  mobId: string;
}

export interface CombatCreationAttributes extends Optional<CombatAttributes, null> { }