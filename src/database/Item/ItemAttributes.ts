import { Optional } from "sequelize/types";

export interface ItemAttributes {
  id: number;
  name: string;
  description: string;
  itemTypeId: number;
  itemSubtypeId: number;
}

export interface ItemCreationAttributes extends Optional<ItemAttributes, null> { }