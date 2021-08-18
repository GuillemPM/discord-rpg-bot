import { Optional } from "sequelize/types";

export interface InventoryAttributes {
  id: number;
  avatarId: string;
  itemId: number;
  instanceItemGuid: string;
  quantity: number;
  equiped: boolean;
}

export interface InventoryCreationAttributes extends Optional<InventoryAttributes, null> { }