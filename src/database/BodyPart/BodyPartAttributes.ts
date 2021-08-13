import { Optional } from "sequelize/types";

export interface BodyPartAttributes {
  id: number,
  name: string,
  description: string
}

export interface BodyPartCreationAttributes extends Optional<BodyPartAttributes, null> { }