import { Collection, Message, MessageEmbed } from "discord.js";
import { Bot } from "../../client/Client";
import { Avatar } from "../../database/Avatar/Model/Avatar";
import { MainStats } from "../../dbInit";
import { Command, RunFunction } from '../../interfaces/Command';

export class Stats implements Command {
  public name: string = 'stats';
  public description: string = 'Asigna tus stats!';
  public aliases: string[] = ['s'];
  public permisions: number = 1;
  public subcommands: Collection<string, Command> = new Collection();

  public run: RunFunction = async (client: Bot, message: Message, args: string[]) => {

    const avatar: Avatar = await Avatar.findByPk(message.author.id, { raw: false, include: [{model: MainStats, as: 'mainStats'}]})
  
    if (!args.length) {
      const avatarValues = <Avatar>avatar.get({plain: true});
  
      const mEmbed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle(this.description)
        .setURL('https://discord.com')
        .setDescription(`Hola \`${avatarValues.username}\`,\neste es el resumen básico de tus estadísticas:`)
        .addFields(
          { name: '\u200B', value: `🎓 𝗟𝗘𝗩𝗘𝗟 ➟ ${avatarValues.currentLevel}`},
          { name: '\u200B', value: `💪 𝗦𝗧𝗥𝗘𝗡𝗚𝗧𝗛 ➟ ${avatarValues.mainStats.strength}` },
          { name: '\u200B', value: `🗡️ 𝗗𝗘𝗫𝗧𝗘𝗥𝗜𝗧𝗬 ➟ ${avatarValues.mainStats.dexterity}` },
          { name: '\u200B', value: `✨ 𝗜𝗡𝗧𝗘𝗟𝗟𝗜𝗚𝗘𝗡𝗖𝗘 ➟ ${avatarValues.mainStats.intelligence}` },
          { name: '\u200B', value: `🧡 𝗖𝗢𝗡𝗦𝗧𝗜𝗧𝗨𝗧𝗜𝗢𝗡 ➟ ${avatarValues.mainStats.constitution}` },
        );
      return message.channel.send(mEmbed);
    }
  }
}