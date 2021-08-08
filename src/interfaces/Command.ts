import { Bot } from '../client/Client'
import { Message } from "discord.js";

export interface RunFunction {
  (client: Bot, message: Message, args: string[]): Promise<unknown>
}

export interface Command {
  name: string,
  description: string,
  aliases: string[],
  permisions: number,
  run: RunFunction
}
