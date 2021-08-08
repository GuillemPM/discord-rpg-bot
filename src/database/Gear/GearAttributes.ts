import { Optional } from "sequelize/types";

export interface GearAttributes {
  avatarId: string;
  head: string;
  chest: string;
  hands: string;
  legs: string;
  feet: string;
  leftEar: string;
  rightEar: string;
  rightHandFinger: string;
  leftHandFinger: string;
  neck: string;
  waist: string;
}

export interface GearCreationAttributes extends Optional<GearAttributes, null> { }