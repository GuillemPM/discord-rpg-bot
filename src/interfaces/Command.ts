import { Bot } from '../client/Client'
import { Message } from "discord.js";

export interface RunFunction {
  (client: Bot, message: Message, args: string[]): Promise<unknown>
}

export interface Command {
  name: string,
  aliases: string[],
  run: RunFunction,
  description: string,
  permisions: number,
}
