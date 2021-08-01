import { Optional } from "sequelize/types";

export interface ItemSubtypeAttributes {
  id: number,
  name: string,
  description: string,
  itemTypeId: number
}

export interface ItemSubtypeCreationAttributes extends Optional<ItemSubtypeAttributes, null> { }