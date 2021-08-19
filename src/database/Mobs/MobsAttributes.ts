import { Optional } from "sequelize/types";
import { Mobs } from "./Model/mobs";

export interface MobsAttributes {
  mobId: number;
  mName: string;
  hp: number;
  attack: number;
  defense: number;
  speed: number;
}

export interface MobsCreationAttributes extends Optional<Mobs, null> { }