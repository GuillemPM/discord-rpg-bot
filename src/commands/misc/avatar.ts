import { Bot } from "../../client/Client";
import { Message, MessageEmbed, MessageManager } from "discord.js";
import { RunFunction } from "../../interfaces/Command";
import { Avatar } from "../../database/Avatar/Model/Avatar";
import { MainStats } from "../../database/MainStats/Model/MainStats";
import { AdvancedStats } from "../../database/AdvancedStats/Model/AdvancedStats";

export const run: RunFunction = async (client: Bot, message: Message) => {
  const avatar = await Avatar.findByPk(message.author.id, {raw: false, include: [{model: MainStats, as: 'mainStats'},{model: AdvancedStats, as: 'advancedStats'}]});
  const avatarMainValues = <Avatar>avatar.get({plain: true});
  const space : string = '\u200B'
 
  const msg = new MessageEmbed;
  msg
    .setColor('#0099ff')
    .setTitle(`${avatarMainValues.username}`)
    .setURL('https://discord.com')
    .setDescription('Check your stats!')
    .addFields(
      {name: space, value: `Lv.: ${avatarMainValues.currentLevel} \n Exp.: {{${avatarMainValues.experience}}}`},
      {name: space, value: `CON.: ${avatarMainValues.mainStats.constitution} ❯❯ HP: {{${avatarMainValues.advancedStats.hp}}} \n INTE.: ${avatarMainValues.mainStats.intelligence} ❯❯ MP: {{${avatarMainValues.advancedStats.mp}}} \n STRE.: ${avatarMainValues.mainStats.strength} \n DEX.: ${avatarMainValues.mainStats.dexterity}`},
      {name: space, value: `PDMG.: ${avatarMainValues.advancedStats.physicDmg} \n MDMG.: ${avatarMainValues.advancedStats.magicDmg} \n EVASION.: ${avatarMainValues.advancedStats.evasionPct} \n SPEED.: ${avatarMainValues.advancedStats.speed}`}
    );
  return message.channel.send(msg)
};

export const name: string = 'avatar';
export const aliases: string[] = ['me', 'a','avtr'];
export const description: string = 'Use the r!avatar command to display your character info!';
export const permisions: number = 0;