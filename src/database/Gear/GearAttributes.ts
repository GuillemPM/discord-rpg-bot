import { Optional } from "sequelize/types";
import { Gear } from "./Model/Gear";

export interface GearAttributes {
  avatarId: string;
  leftHandWeapon: string;
  rightHandWeapon: string;
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

export interface GearCreationAttributes extends Optional<GearAttributes, Exclude<keyof GearAttributes, 'avatarId'>> { }