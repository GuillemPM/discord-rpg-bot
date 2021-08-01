import { Optional } from "sequelize/types";

export interface InventoryAttributes {
  avatarId: string;
  itemId: number;
  quantity: number;
}

export interface InventoryCreationAttributes extends Optional<InventoryAttributes, null> { }