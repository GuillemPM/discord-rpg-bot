import { Message, MessageEmbed } from "discord.js";
import { Bot } from "../../client/Client";
import { AdvancedStats } from "../../database/AdvancedStats/Model/AdvancedStats";
import { Avatar } from "../../database/Avatar/Model/Avatar";
import { MainStatsAttributes } from "../../database/MainStats/MainStatsAttributes";
import { getAdvancedStatsToIncrement } from "../../database/MainStats/MainStatsMapper";
import { MainStats } from "../../dbInit";
import { RunFunction } from '../../interfaces/Command'

export const run: RunFunction = async (client: Bot, message: Message, args: string[]) => {
  const avatar: Avatar = await Avatar.findByPk(message.author.id, { raw: false, include: [{model: MainStats, as: 'mainStats'}]})

  if (!args.length) {
    const avatarValues = <Avatar>avatar.get({plain: true});

    const mEmbed = new MessageEmbed()
      .setColor('#0099ff')
      .setTitle(description)
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

  const attributeName: string = args[0]
  const attributePoints: number = Number.parseInt(args[1])

  if (!Object.keys(MainStats.rawAttributes).filter(key => key !== 'avatarId').includes(attributeName)) {
    return message.channel.send(`El atributo ${attributeName} no existe puto bobo`)
  }

  if (!attributePoints) {
    return message.channel.send(`El valor ${args[1]} no es válido`)
  }

  const ms: MainStats = await MainStats.findByPk(message.author.id);

  MainStats.increment(<keyof MainStatsAttributes>attributeName, {
    by: attributePoints,
    where: {
      avatarId: message.author.id
    }
  })
    .then(() => {
      getAdvancedStatsToIncrement(attributeName).map((value, key) => {
        AdvancedStats.increment(key, {
          by: attributePoints * value,
          where: {
            avatarId: message.author.id
          }
        })
      })
      message.channel.send(`Tu ${attributeName} se ha incrementado en ${attributePoints} puntos, ahora tiene ${ms[attributeName] + attributePoints}`)
    })
};

export const name: string = 'stats';
export const description: string = 'Asigna tus stats!';