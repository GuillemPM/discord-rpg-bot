import { Optional } from "sequelize/types";

export interface ItemTypeAttributes {
  id: number;
  name: string;
  description: string;
}

export interface ItemTypeCreationAttributes extends Optional<ItemTypeAttributes, null> { }