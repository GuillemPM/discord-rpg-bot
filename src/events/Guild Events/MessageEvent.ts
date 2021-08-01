import { Command } from "../../interfaces/Command";
import { Message } from "discord.js";
import { Bot } from "../../client/Client";
import { RunFunction } from "../../interfaces/Event";
import { Avatar } from "../../dbInit";

export const run: RunFunction = async (client: Bot, message: Message) => {
  if (!message.content.startsWith(client.configOptions.prefix) || message.author.bot) return;

  const args: string[] = message.content.slice(client.configOptions.prefix.length).trim().split(/ +/g);
  const command: Command = client.commands.get(args.shift().toLowerCase());

  if (!command) return;

  const avatar: Avatar = await Avatar.findByPk(message.author.id);

  if (!avatar && (command.name !== 'start')) {
    return message.channel.send('Debes crear un avatar primero')
  }

  if (avatar && (!avatar.connected && command.name !== 'connect')){
    return message.channel.send('Debes conectarte primero')
  }

  command.run(client, message, args)
    .catch(err => client.logger.error(err));
}

export const name: string = 'message';