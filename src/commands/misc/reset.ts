import { CollectorFilter, Message, MessageEmbed, MessageReaction, User } from "discord.js";
import { Bot } from "../../client/Client";
import { Avatar } from "../../database/Avatar/Model/Avatar";
import { RunFunction } from '../../interfaces/Command'

export const run: RunFunction = async (client: Bot, message: Message) => {
  const av = await Avatar.findByPk(message.author.id)

  if (av) {
    const mEmbed: MessageEmbed = new MessageEmbed()
		.setColor('#0099ff')
		.setTitle(description)
		.setURL('https://discord.com')
		.setDescription(`¿Estás seguro de que deseas eliminar tu avatar llamado \`${av.username}\`?`);
	const msg: Message = await message.channel.send(mEmbed);
	msg.react('❌').then(() => msg.react('✅'));

	const filter: CollectorFilter = (reaction: MessageReaction, user: User) => {
		return ['❌', '✅'].includes(reaction.emoji.name) && user.id === message.author.id;
	};

	msg.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
		.then(collected => {
			const reaction = collected.first();

			if (reaction.emoji.name === '❌') {
				mEmbed
					.setColor('#0099ff')
					.setTitle(description)
					.setURL('https://discord.com')
					.setDescription('Acción cancelada');
        return msg.edit(mEmbed);
			}

			if (reaction.emoji.name === '✅') {
				Avatar.destroy({where: { id: message.author.id }})
					.then(() => {
						mEmbed
							.setColor('#0099ff')
							.setTitle(description)
							.setURL('https://discord.com')
							.setDescription(`De acuerdo, se ha eliminado el avatar \`${av.username}\` con éxito`);
              return msg.edit(mEmbed);
					})
					.catch((err: unknown) => client.logger.error(err))
			}
		})
  }
};

export const name: string = 'reset';
export const description: string = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaiuda!';