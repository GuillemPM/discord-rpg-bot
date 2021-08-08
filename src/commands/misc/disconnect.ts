import { Message, MessageEmbed } from "discord.js";
import { Bot } from "../../client/Client";
import { Avatar } from "../../database/Avatar/Model/Avatar";
import { RunFunction } from '../../interfaces/Command'

export const run: RunFunction = async (client: Bot, message: Message) => {
  Avatar.update({ connected: false },
    { where: { id: message.author.id } })
    .then(() => {
      const mEmbed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle(description)
        .setURL('https://discord.com')
        .setDescription('Disconnect text');
      return message.channel.send(mEmbed);
    })
    .catch((err) => {
      client.logger.error(err);
      message.channel.send('Ha ocurrido un error intentado desconectar.');
    })
};

export const name: string = 'disconnect';
export const description: string = 'Desconéctate del mundo!';
export const aliases: string[] = ['dc', 'dcon', 'disc'];