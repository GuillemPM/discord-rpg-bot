import { Message, MessageEmbed } from "discord.js";
import { Bot } from "../../client/Client";
import { RunFunction } from "../../interfaces/Command";

export const run: RunFunction = async (client: Bot, message: Message) => {
  const msg = new MessageEmbed()
    .setColor('#0099ff')
	  .setTitle('Check te commands!')
	  .setURL('https://discord.com')

  client.commands.forEach(cmd => {
    if (cmd.permisions !== 1) {
      msg.addField(`[${cmd.name}]`, `${cmd.description}\nAliases: ${cmd.aliases ? cmd.aliases.join(', ') : 'No aliases available'}`)
    }
  })
  
  return message.channel.send(msg)
}

export const name: string = 'help';
export const description: string = 'Use r!help for displaying all commands that you can use'
export const permisions: number = 0