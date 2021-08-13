import { Bot } from "../../client/Client";
import { Collection, Message, MessageEmbed } from "discord.js";
import { RunFunction } from "../../interfaces/Command";
import { Avatar as AvatarModel } from "../../database/Avatar/Model/Avatar";
import { MainStats } from "../../database/MainStats/Model/MainStats";
import { AdvancedStats } from "../../database/AdvancedStats/Model/AdvancedStats";
import { Command } from '../../interfaces/Command';

export class Avatar implements Command {
  public name: string = 'avatar';
  public description: string = 'Use the r!avatar command to display your character info!';
  public aliases: string[] = ['me', 'a','avtr'];
  public permisions: number = 0;
  public subcommands: Collection<string, Command> = new Collection();

  public run: RunFunction = async (client: Bot, message: Message) => {
    const avatar = await AvatarModel.findByPk(message.author.id, {raw: false, include: [{model: MainStats, as: 'mainStats'},{model: AdvancedStats, as: 'advancedStats'}]});
    const avatarMainValues = <AvatarModel>avatar.get({plain: true});
    const space : string = '\u200B'
    console.log(avatarMainValues)
    const msgEmbed: MessageEmbed = new MessageEmbed()
      .setColor(3447003)
      .setThumbnail('https://i.imgur.com/6etwdRa.png')
      .setAuthor(`${avatarMainValues.username}'s profile`, message.author.displayAvatarURL())
      .setTitle(space)
      .addFields(
        {
          name: `🎓 Level ${avatarMainValues.currentLevel}`,
          value: `Exp. needed: \`${this.nextLevel(avatarMainValues.experience)}\``,
          inline: true
        },
        {
          name: `Experience (${avatarMainValues.experience}/${avatarMainValues.experience + this.nextLevel(avatarMainValues.experience)})`,
          value: this.levelBar(avatarMainValues.experience),
          inline: true
        },
        {
          name: space,
          value: space,
          inline: true
        },
        {
          name: space,
          value: '━━ Attributes ━━━━━━━━━━━━'
        },
        {
          name: '🧡 Constitution',
          value: `\`${avatarMainValues.mainStats.constitution}\``,
          inline: true
        },
        {
          name: '💪 Strength',
          value: `\`${avatarMainValues.mainStats.strength}\``,
          inline: true
        },
        {
          name: space,
          value: space,
          inline: true
        },
        {
          name: '🗡️ Dexterity',
          value: `\`${avatarMainValues.mainStats.dexterity}\``,
          inline: true
        },
        {
          name: '🧠 Intelligence',
          value: `\`${avatarMainValues.mainStats.intelligence}\``,
          inline: true
        },
        {
          name: space,
          value: space,
          inline: true
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
          value: space,
          inline: true
        },
        {
          name: `👊 Physic dmg.`,
          value: `\`${avatarMainValues.advancedStats.physicDmg}\``,
          inline: true
        },
        {
          name: `✨ Magic dmg.`,
          value: `\`${avatarMainValues.advancedStats.magicDmg}\``,
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
          value: `\`${avatarMainValues.advancedStats.speed}\``,
          inline: true,
        },
        {
          name: `🍃 Evasion %`,
          value: `\`${avatarMainValues.advancedStats.evasionPct}\``,
          inline: true,
        },
        {
          name: `🐘 Weight `,
          value: `\`${avatarMainValues.advancedStats.weight}\``,
          inline: true
        }
      )
      message.channel.send(msgEmbed)
  };

  private levelBar = (experience: number) : string => {
    const actualLevel: number = Math.floor(Math.pow(experience, 1/3)) || 1
    const nextLevel: number = Math.pow(actualLevel + 1, 3) 
  
    const levelPerc: number = Math.floor((experience / nextLevel) * 100)
  
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

  private nextLevel = (experience: number) : number => {
    const actualLevel: number = Math.floor(Math.pow(experience, 1/3)) || 1
    const nextLevel: number = Math.pow(actualLevel + 1, 3)
    const nextLevelExperience: number = (nextLevel - experience)
  
    return nextLevelExperience 
  }
}