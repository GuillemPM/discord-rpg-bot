import { Collection } from "discord.js";
import { AdvancedStatsAttributes } from "../AdvancedStats/AdvancedStatsAttributes";
import { MainStatsAttributes } from "./MainStatsAttributes";

type incrAdvancedStats = Collection<keyof AdvancedStatsAttributes, number>;

export const getAdvancedStatsToIncrement = (attrName: string): incrAdvancedStats => {
  const mainStatsAttributeName: keyof MainStatsAttributes = <keyof MainStatsAttributes>attrName;
  const incrAdvStats: incrAdvancedStats = new Collection();
  incrAdvStats.set('hp', 13);
  incrAdvStats.set('mp', 12);
  incrAdvStats.set('physicDmg', 7);
  incrAdvStats.set('magicDmg', 7);
  incrAdvStats.set('speed', 2);
  incrAdvStats.set('evasionPct', 0.2);
  incrAdvStats.set('weight', 1.5);

  const linkStats: Collection<keyof MainStatsAttributes, incrAdvancedStats> = new Collection();
  linkStats.set('strength', incrAdvStats.filter((value, key) => key == 'physicDmg'));
  linkStats.set('dexterity', incrAdvStats.filter((value, key) => ['speed', 'evasionPct'].includes(key)));
  linkStats.set('intelligence', incrAdvStats.filter((value, key) => ['magicDmg', 'mp'].includes(key)));
  linkStats.set('constitution', incrAdvStats.filter((value, key) => ['hp', 'weight'].includes(key)));

  return linkStats.get(mainStatsAttributeName);
}