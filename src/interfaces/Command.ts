import { Bot } from '../client/Client'
import { Message } from "discord.js";

export interface RunFunction {
  (client: Bot, message: Message, args: string[]): Promise<unknown>
}

export interface Command {
  name: string,
<<<<<<< HEAD
  aliases: string[],
  run: RunFunction
=======
  run: RunFunction,
  description: string,
  permisions: number,
>>>>>>> discord-rpg-bot-base/feature-help-command
}
