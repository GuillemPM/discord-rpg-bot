import { Optional } from "sequelize/types";

/*
strength: number; //Fisico
dexterity: number; //Fisico/Ranged/Velocidad/critical
intelligence: number; //Magico/Mana
constitution: number; //Vida/Resistencias/carga
*/

export interface AdvancedStatsAttributes {
  avatar_id: string;
  hp: number;
  mp: number;
  physic_dmg: number;
  magic_dmg: number;
  speed: number;
  evasion_pct: number;
  weight: number;
}

export interface AdvancedStatsCreationAttributes extends Optional<AdvancedStatsAttributes, null> { }