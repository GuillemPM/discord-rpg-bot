import { Message, MessageEmbed } from "discord.js";
import { Bot } from "../../client/Client";
import { MainStatsAttributes } from "../../database/MainStats/MainStatsAttributes";
import { MainStats } from "../../dbInit";
import { RunFunction } from '../../interfaces/Command'

export const run: RunFunction = async (client: Bot, message: Message, args: string[]) => {
  const ms = new MainStats;
  
  if (!Object.prototype.hasOwnProperty.call(ms, args[0])) {
    client.logger.error(`AAAAAAAAAAAAA mal`)
  }

  const n: number = Number.parseInt(args[1]);

  if (!n) {
    return client.logger.error(`${args[1]? '': ''} no es un numero`);
  }

  

};

export const name: string = 'stats';
export const description: string = 'Asigna tus stats!';