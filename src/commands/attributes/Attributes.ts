import { Collection, Message, MessageEmbed } from "discord.js";
import { Bot } from "../../client/Client";
import { Avatar, AdvancedStats, MainStats } from "../../dbInit";
import { Command, RunFunction } from '../../interfaces/Command';

export class Attributes implements Command {
  public name: string = 'attributes';
  public description: string = 'Asigna tus atributos!';
  public aliases: string[] = ['attr'];
  public permisions: number = 1;
  public subcommands: Collection<string, Command> = new Collection();

  public run: RunFunction = async (client: Bot, message: Message, args: string[]) => {

    const avatar: Avatar = await Avatar.findByPk(message.author.id, { raw: false, include: [{model: MainStats, as: 'mainStats'},{model: AdvancedStats, as: 'advancedStats'}]})
  
    if (!args.length) {
      const avatarValues = <Avatar>avatar.get({plain: true});
      const space : string = '\u200B'
      const mEmbed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle('━━ Attributes ━━━━━━━━━━━━')
        .setURL('https://discord.com')
        .setDescription(`Hola \`${avatarValues.username}\`, estas son tus estadísticas:\nAssignable points: \`${avatarValues.attributePoints - avatarValues.assignedAttributePoints}\`/\`${avatarValues.attributePoints}\``)
        .addFields(
          {
            name: '🧡 Constitution',
            value: `\`${avatarValues.mainStats.constitution}\``,
            inline: true
          },
          {
            name: '💪 Strength',
            value: `\`${avatarValues.mainStats.strength}\``,
            inline: true
          },
          {
            name: space,
            value: space,
            inline: true
          },
          {
            name: '🗡️ Dexterity',
            value: `\`${avatarValues.mainStats.dexterity}\``,
            inline: true
          },
          {
            name: '🧠 Intelligence',
            value: `\`${avatarValues.mainStats.intelligence}\``,
            inline: true
          },
          {
            name: space,
            value: space,
            inline: true
          }
        );
      return message.channel.send(mEmbed);
    }
  }
}