import { Bot } from "../../client/Client";
import { Message } from "discord.js";
import { RunFunction } from "../../interfaces/Command";
import { Avatar } from "../../database/Avatar/Model/Avatar";
import { MainStats } from "../../database/MainStats/Model/MainStats";
import { AdvancedStats } from "../../database/AdvancedStats/Model/AdvancedStats";

export const run: RunFunction = async (client: Bot, message: Message) => {
  const avatar = await Avatar.findByPk(message.author.id, {raw: false, include: [{model: MainStats, as: 'mainStats'},{model: AdvancedStats, as: 'advancedStats'}]});
  const avatarMainValues = <Avatar>avatar.get({plain: true});
  const space : string = '\u200B'

  message.channel.send({ embed: {
      color: 3447003,
      author: {
        icon_url: message.author.displayAvatarURL(),
        name: message.author.username,
      },
      title: 'Check your stats!',
      fields: [
        {
          name: 'Lv🎓',
          value: `${avatarMainValues.currentLevel}`,
          inline: true
        },
        {
          name: 'Experience:',
          value: `${avatarMainValues.experience}`,
          inline: true
        },
        {
          name: 'Exp. Bar',
          value: levelBar(avatarMainValues.experience),
          inline: true,
        },
        {
          name: 'Exp. Until Next Lv',
          value: nextLevel(avatarMainValues.experience)
        },
        {
          name: space,
          value: `${avatarMainValues.mainStats.constitution} 𝗖𝗢𝗡𝗦𝗧𝗜𝗧𝗨𝗧𝗜𝗢𝗡 🧡`
        },
        {
          name: space,
          value: `${avatarMainValues.mainStats.strength} 𝗦𝗧𝗥𝗘𝗡𝗚𝗧𝗛 💪`
        },
        {
          name: space,
          value: `${avatarMainValues.mainStats.strength} 𝗗𝗘𝗫𝗧𝗘𝗥𝗜𝗧𝗬 🗡️`
        },
        {
          name: space,
          value: `${avatarMainValues.mainStats.strength} 𝗜𝗡𝗧𝗘𝗟𝗟𝗜𝗚𝗘𝗡𝗖𝗘 ✨`
        },
        {
          name: space,
          value: space
        },
        {
          name: `HP ❤️`,
          value: `${avatarMainValues.advancedStats.hp - avatarMainValues.advancedStats.missingHp}/${avatarMainValues.advancedStats.hp}`,
          inline: true
        },
        {
          name: `MP ☄`,
          value: `${avatarMainValues.advancedStats.mp - avatarMainValues.advancedStats.missingMp}/${avatarMainValues.advancedStats.mp}`,
          inline: true
        },
        {
          name: `Phis.DMG`,
          value: `${avatarMainValues.advancedStats.physicDmg}`,
        },
        {
          name: `Magic.DMG`,
          value: `${avatarMainValues.advancedStats.magicDmg}`,
        },
        {
          name: space,
          value: space
        },
        {
          name: `Speed 👢`,
          value: `${avatarMainValues.advancedStats.speed}`,
          inline: true,
        },
        {
          name: `Evasion% 🍃`,
          value: `${avatarMainValues.advancedStats.evasionPct}`,
          inline: true,
        },
        {
          name: space,
          value: space
        },
        {
          name: `Weight 🐘`,
          value: `${avatarMainValues.advancedStats.weight}`
        }        
      ],
    }
  });

};

function levelBar(experience: number){
  const actualLevel: number = Math.floor(Math.pow(experience, 1/3)) || 1
  const thisLevel: number = Math.pow(actualLevel, 3)
  const nextLevel: number = Math.pow(actualLevel + 1, 3) 
  const nextLevelExperience: number = ((nextLevel+1) - experience)
  const actLevelExperience: number = (experience - (thisLevel+1))

  const levelPerc: number = Math.round((actLevelExperience / nextLevelExperience) * 100)

  switch(true){
    case (levelPerc <= 10): return '<||··················>';
    break; 
    case (levelPerc <= 20): return '<||||················>';
    break;
    case (levelPerc <= 30): return '<||||||··············>';
    break;
    case (levelPerc <= 40): return '<||||||||············>';
    break;  
    case (levelPerc <= 50): return '<||||||||||··········>';
    break; 
    case (levelPerc <= 60): return '<||||||||||||········>';
    break; 
    case (levelPerc <= 70): return '<||||||||||||||······>';
    break; 
    case (levelPerc <= 80): return '<||||||||||||||||····>';
    break; 
    case (levelPerc <= 90): return '<||||||||||||||||||··>';
    break; 
  }
}
function nextLevel(experience: number){
  const actualLevel: number = Math.floor(Math.pow(experience, 1/3)) || 1
  const nextLevel: number = Math.pow(actualLevel + 1, 3)
  const nextLevelExperience: number = ((nextLevel + 1) - experience)

  return nextLevelExperience 
}

export const name: string = 'avatar';
export const aliases: string[] = ['me', 'a','avtr'];
export const description: string = 'Use the r!avatar command to display your character info!';
export const permisions: number = 0;