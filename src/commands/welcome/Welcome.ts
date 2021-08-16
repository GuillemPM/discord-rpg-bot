import { Collection, Message, MessageEmbed } from "discord.js";
import { Bot } from "../../client/Client";
import { Command, RunFunction } from '../../interfaces/Command'

export class Welcome implements Command {
  public name: string = 'welcome';
  public description: string = 'Use \`r!welcome\` to start your journey!';
  public aliases: string[] = ['w', 'wc'];
  public permisions: number = 0;
  public subcommands: Collection<string, Command> = new Collection();

  public run: RunFunction = async (client: Bot, message: Message) => {
    const mEmbed = new MessageEmbed()
      .setColor('#0099ff')
      .setTitle(this.description)
      .setURL('https://discord.com')
      .setDescription('Bienvenid@ a Unreality Corp., la primera empresa mundial que ha conseguido desarrollar un mundo virtual RPG de inmersión total.\nEl nuevo mundo está en fase beta así que no puedo explicarte mucho más, a partir de aquí tendrás que continuar tú sol@.\n\nUtiliza el comando \`r!start\` para realizar la prueba de acceso');
    return message.channel.send(mEmbed);
  };
}