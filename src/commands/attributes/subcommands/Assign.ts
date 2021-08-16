import { Collection, Message } from "discord.js";
import { Bot } from "../../../client/Client";
import { MainStatsAttributes } from "../../../database/MainStats/MainStatsAttributes";
import { getAdvancedStatsToIncrement } from "../../../database/MainStats/MainStatsMapper";
import { MainStats, AdvancedStats, Avatar } from "../../../dbInit";
import { Command, RunFunction } from '../../../interfaces/Command'

export class Assign implements Command {
  public name: string = 'assign';
  public description: string = 'Use the command \`assign\` to increase your atribute stats. \n \`<attributes assign attribute_name number>\`';
  public aliases: string[] = ['a'];
  public permisions: number = 1;
  public subcommands: Collection<string, Command> = new Collection();

  public run: RunFunction = async (client: Bot, message: Message, args: string[]) => {

    const attributeName: string = args[0]
    const attributePoints: number = Number.parseInt(args[1])

    if (!Object.keys(MainStats.rawAttributes).filter(key => key !== 'avatarId').includes(attributeName)) {
      return message.channel.send(`El atributo ${attributeName} no existe puto bobo`)
    }

    if (!attributePoints || attributePoints < 0) {
      return message.channel.send(`El valor ${args[1]} no es válido`)
    }

    const avatar = await Avatar.findByPk(message.author.id, { raw: false });
    const avatarValues = <Avatar>avatar.get({ plain: true });

    if (avatarValues.attributePoints - avatarValues.assignedAttributePoints < attributePoints) {
      return message.channel.send(`No tienes tantos puntos disponibles`);
    }

    avatar.addAttributePoint(attributeName, attributePoints);

    return message.channel.send(`Has asignado ${attributePoints} a ${attributeName}`);

    /*const ms: MainStats = await MainStats.findByPk(message.author.id);

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
      })*/
  };
}