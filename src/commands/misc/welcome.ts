import { Message, MessageEmbed } from "discord.js";
import { Bot } from "../../client/Client";
import { RunFunction } from '../../interfaces/Command'

export const run: RunFunction = async (client: Bot, message: Message) => {
  const mEmbed = new MessageEmbed()
    .setColor('#0099ff')
    .setTitle(description)
    .setURL('https://discord.com')
    .setDescription('Bienvenid@ a Unreality Corp., la primera empresa mundial que ha conseguido desarrollar un mundo virtual RPG de inmersión total.\nEl nuevo mundo está en fase beta así que no puedo explicarte mucho más, a partir de aquí tendrás que continuar tú sol@.\n\nUtiliza el comando \`r!start\` para realizar la prueba de acceso');
  return message.channel.send(mEmbed);
};

export const name: string = 'welcome';
export const description: string = 'Comienza tu aventura!';