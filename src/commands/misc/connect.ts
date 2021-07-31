import { Message, MessageEmbed } from "discord.js";
import { Bot } from "../../client/Client";
import { Avatar } from "../../database/Avatar/Model/Avatar";
import { RunFunction } from '../../interfaces/Command'

export const run: RunFunction = async (client: Bot, message: Message) => {
  Avatar.update({ connected: true },
    { where: { id: message.author.id } })
    .then(() => {
      const mEmbed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle(description)
        .setURL('https://discord.com')
        .setDescription('Connect text');
      return message.channel.send(mEmbed);
    })
    .catch((err) => {
      client.logger.error(err);
      message.channel.send('Ha ocurrido un error intentado conectar.');
    })
};

export const name: string = 'connect';
export const description: string = 'Conéctate al mundo!';