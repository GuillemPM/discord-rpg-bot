import { Collection, Message, MessageEmbed } from "discord.js";
import { Bot } from "../../client/Client";
import { Avatar } from "../../dbInit";
import { Command, RunFunction } from '../../interfaces/Command'

export class Connect implements Command {
  public name: string = 'connect';
  public description: string = 'Use the r!connect command to connect to the world! You need to connect first to start or resume yor adventure!';
  public aliases: string[] = ['c', 'con'];
  public permisions: number = 0;
  public subcommands: Collection<string, Command> = new Collection();
  
  public run: RunFunction = async (client: Bot, message: Message) => {
    Avatar.update({ connected: true },
      { where: { id: message.author.id } })
      .then(() => {
        const mEmbed = new MessageEmbed()
          .setColor('#0099ff')
          .setTitle(this.description)
          .setURL('https://discord.com')
          .setDescription('Connect text');
        return message.channel.send(mEmbed);
      })
      .catch((err) => {
        client.logger.error(err);
        message.channel.send('Ha ocurrido un error intentado conectar.');
      })
  };
}