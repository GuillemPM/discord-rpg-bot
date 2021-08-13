import { Collection, Message, MessageEmbed } from "discord.js";
import { Bot } from "../../client/Client";
import { Command, RunFunction } from "../../interfaces/Command";

export class Help implements Command {
  public name: string = 'help';
  public description: string = 'Use r!help for displaying all commands that you can use';
  public aliases: string[] = ['h'];
  public permisions: number = 0;
  public subcommands: Collection<string, Command> = new Collection();

  public run: RunFunction = async (client: Bot, message: Message) => {
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
  
}