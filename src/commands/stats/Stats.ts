import { Collection, Message, MessageEmbed } from "discord.js";
import { Bot } from "../../client/Client";
import { Avatar, AdvancedStats, MainStats } from "../../dbInit";
import { Command, RunFunction } from '../../interfaces/Command';

export class Stats implements Command {
  public name: string = 'stats';
  public description: string = 'Use r!stats to check your stats';
  public aliases: string[] = ['s'];
  public permisions: number = 1;
  public subcommands: Collection<string, Command> = new Collection();

  public run: RunFunction = async (client: Bot, message: Message, args: string[]) => {

    const avatar: Avatar = await Avatar.findByPk(message.author.id, { raw: false, include: [{model: MainStats, as: 'mainStats'},{model: AdvancedStats, as: 'advancedStats'}]})
  
    if (!args.length) {
      const avatarValues = <Avatar>avatar.get({plain: true});
      const space : string = '\u200B'
      const mEmbed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle('━━ Stats ━━━━━━━━━━━━━━')
        .setURL('https://discord.com')
        .setDescription(`Hola \`${avatarValues.username}\`, estas son tus estadísticas:`)
        .addFields(
          {
            name: `❤️ Health`,
            value: `\`${avatarValues.advancedStats.hp - avatarValues.advancedStats.missingHp}\`/\`${avatarValues.advancedStats.hp}\``,
            inline: true
          },
          {
            name: `☄ Mana`,
            value: `\`${avatarValues.advancedStats.mp - avatarValues.advancedStats.missingMp}\`/\`${avatarValues.advancedStats.mp}\``,
            inline: true
          },
          {
            name: space,
            value: space,
            inline: true
          },
          {
            name: `👊 Physic dmg.`,
            value: `\`${avatarValues.advancedStats.physicDmg}\``,
            inline: true
          },
          {
            name: `✨ Magic dmg.`,
            value: `\`${avatarValues.advancedStats.magicDmg}\``,
            inline: true
          },
          {
            name: space,
            value: space,
            inline: true
          },
          {
            name: `🎯 Crit. chance %`,
            value: `\`0\``,
            inline: true
          },
          {
            name: `💥 Crit. dmg. %`,
            value: `\`0\``,
            inline: true
          },
          {
            name: space,
            value: space,
            inline: true
          },
          {
            name: `👢 Speed`,
            value: `\`${avatarValues.advancedStats.speed}\``,
            inline: true,
          },
          {
            name: `🍃 Evasion %`,
            value: `\`${avatarValues.advancedStats.evasionPct}\``,
            inline: true,
          },
          {
            name: `🐘 Weight `,
            value: `\`${avatarValues.advancedStats.weight}\``,
            inline: true
          }
        );
      return message.channel.send(mEmbed);
    }
  }
}