import { Optional } from "sequelize/types";
import { Region } from "./Model/Region";

export interface RegionAttributes {
  Id: number;
  Name: string;
  RecommendedLevel: number
}

export interface RegionCreationAttributes extends Optional<Region, null> { }