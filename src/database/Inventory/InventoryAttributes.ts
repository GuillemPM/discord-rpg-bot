  import { Optional } from "sequelize/types";

export interface InventoryAttributes {
  id: number;
  avatarId: string;
  itemId: number;
  instanceItemGuid: string;
  quantity: number;
}

export interface InventoryCreationAttributes extends Optional<InventoryAttributes, null> { }