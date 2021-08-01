import { Optional } from "sequelize/types";

export interface GearInventoryAttributes {
  avatarId: string;
  itemId: number;
  instanceItemGuid: string;
}

export interface GearInventoryCreationAttributes extends Optional<GearInventoryAttributes, null> { }