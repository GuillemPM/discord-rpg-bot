import { Optional } from "sequelize/types";
import { MobTypes } from "./Model/MobTypes";

export interface MobTypesAttributes {
  id: number;
  name: string;
  strongAgainst: number;
  weakAgainst: number;
}

export interface MobTypesCreationAttributes extends Optional<MobTypes, null> { }