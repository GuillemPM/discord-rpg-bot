import { Bot } from "../../client/Client";
import { Collection, Message, MessageEmbed } from "discord.js";
import { RunFunction } from "../../interfaces/Command";
import { Avatar as AvatarModel, MainStats, AdvancedStats } from "../../dbInit";
import { Command } from '../../interfaces/Command';

export class Avatar implements Command {
  public name: string = 'avatar';
  public description: string = 'Use the \`r!avatar\` command to display your character info!';
  public aliases: string[] = ['me', 'a','avtr'];
  public permisions: number = 0;
  public subcommands: Collection<string, Command> = new Collection();

  public run: RunFunction = async (client: Bot, message: Message) => {
    const avatar = await AvatarModel.findByPk(message.author.id, {raw: false, include: [{model: MainStats, as: 'mainStats'},{model: AdvancedStats, as: 'advancedStats'}]});
    const avatarMainValues = <AvatarModel>avatar.get({plain: true});
    const space : string = '\u200B'
    const msgEmbed: MessageEmbed = new MessageEmbed()
      .setColor(3447003)
      .setThumbnail('https://i.imgur.com/6etwdRa.png')
      .setAuthor(`${avatarMainValues.username}'s profile`, message.author.displayAvatarURL())
      .setTitle(space)
      .addFields(
        {
          name: `🎓 Level ${avatarMainValues.level}`,
          value: `Exp. needed: \`${avatarMainValues.requiredExp - avatarMainValues.totalExp}\``,
          inline: true
        },
        {
          name: '⚡ Energy',
          value: `\`${avatarMainValues.currentEnergy}\`/\`${avatarMainValues.maxEnergy}\``,
          inline: true
        },
        {
          name: space,
          value: space,
          inline: true
        },
        {
          name: `Experience (${avatarMainValues.totalExp}/${avatarMainValues.requiredExp})`,
          value: this.levelBar(avatarMainValues.level, avatarMainValues.totalExp),
        },
        {
          name: space,
          value: space,
        },
        {
          name: '━━ Extra ━━━━━━━━━━━━',
          value: `Use the command \`r!attributes\``
        },
        {
          name: space,
          value: '━━ Stats ━━━━━━━━━━━━━━'
        },
        {
          name: `❤️ Health`,
          value: `\`${avatarMainValues.advancedStats.hp - avatarMainValues.advancedStats.missingHp}\`/\`${avatarMainValues.advancedStats.hp}\``,
          inline: true
        },
        {
          name: `☄ Mana`,
          value: `\`${avatarMainValues.advancedStats.mp - avatarMainValues.advancedStats.missingMp}\`/\`${avatarMainValues.advancedStats.mp}\``,
          inline: true
        },
        {
          name: space,
          value: 'Use the command \`r!stats\` to see more'
        }
      )
      message.channel.send(msgEmbed)
  };

  private levelBar = (level: number, experience: number) : string => {

    const currentLevelBaseExp: number = Math.pow(level, 3);
    const nextLevel: number = Math.pow(level + 1, 3) 

    const levelPerc: number = experience - currentLevelBaseExp ? Math.floor((experience / nextLevel) * 100) : 0;

    let expBar: string = '';
    for (let i = 0; i < 16; i++) {
      if (levelPerc < (i + 1) * 6.25) {
        expBar += "░";
      }
      else {
        expBar += "▓"
      }    
    }

    return expBar
  }
}