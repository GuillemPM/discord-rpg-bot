import { Collection, Message, MessageEmbed } from "discord.js";
import { Bot } from "../../client/Client";
import { Avatar } from "../../dbInit";
import { Command, RunFunction } from '../../interfaces/Command'

export class Disconnect implements Command {
  public name: string = 'Disconnect';
  public description: string = 'Use r!disconnect to put an end to your journey! The adventure awaits for you to come back!';
  public aliases: string[] = ['dc', 'dcon', 'disc'];
  public permisions: number = 0;
  public subcommands: Collection<string, Command> = new Collection();
  
  public run: RunFunction = async (client: Bot, message: Message) => {
    Avatar.update({ connected: false },
      { where: { id: message.author.id } })
      .then(() => {
        const mEmbed = new MessageEmbed()
          .setColor('#0099ff')
          .setTitle(this.description)
          .setURL('https://discord.com')
          .setDescription('Disconnect text');
        return message.channel.send(mEmbed);
      })
      .catch((err) => {
        client.logger.error(err);
        message.channel.send('Ha ocurrido un error intentado desconectar.');
      })
  };
}