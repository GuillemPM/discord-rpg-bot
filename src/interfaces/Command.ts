import { Bot } from '../client/Client'
import { Collection, Message } from "discord.js";

export interface RunFunction {
  (client: Bot, message: Message, args: string[]): Promise<unknown>
}

export interface AddSubcommandFunction {
  (subcommand: Command)
}

export interface Command {
  name: string,
  description: string,
  aliases: string[],
  permisions: number,
  subcommands: Collection<string, Command>,
  run: RunFunction
}
