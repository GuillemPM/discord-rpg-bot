import { CollectorFilter, Message, MessageEmbed, MessageReaction, User } from "discord.js";
import { Bot } from "../../client/Client";
import { RunFunction } from "../../interfaces/Command";
import { Avatar, MainStats } from "../../dbInit";

export const run: RunFunction = async (client: Bot, message: Message, args: string[]) => {
	const av = await Avatar.findByPk(message.author.id)
	if (av) {
		return message.channel.send(`Ya tienes un avatar, su nombre es \`${av.username}\``)
	}


	if (!args.length) {
		const mEmbed: MessageEmbed = new MessageEmbed()
			.setColor('#0099ff')
			.setTitle(description)
			.setURL('https://discord.com')
			.setDescription('Hola aventurer@, mi nombre es Eustaquio, y soy el GM de Unreality Corp., necesito que te sientes y respondas unas preguntas antes de sincronizarte con tu nuevo avatar.\nAhí va la primera, ¿cuál será el nombre de tu avatar?\n\nUtiliza el comando `r!start <<nombre>>` para continuar');
		return message.channel.send(mEmbed);
	}

	const username: string = args.join(' ');
	const mEmbed: MessageEmbed = new MessageEmbed()
		.setColor('#0099ff')
		.setTitle(description)
		.setURL('https://discord.com')
		.setDescription(`Así que el nombre de tu avatar será \`${username}\`, ¿eh?\n¿Estás seguro?`);
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
					.setDescription('Vaya, ¿te has equivocado de nombre? ¿Cómo se llamará entonces?\n\nUtiliza el comando `r!start <<nombre>>` para continuar');
			}

			if (reaction.emoji.name === '✅') {
				Avatar.create(<Avatar>{ id: message.author.id, username: username, mainStats: { strength: 0, dexterity: 0, intelligence: 0, constitution: 0 } }, { include: [{ model: MainStats, as: 'mainStats' }] })
					.then(() => {
						mEmbed
							.setColor('#0099ff')
							.setTitle(description)
							.setURL('https://discord.com')
							.setDescription(`De acuerdo, le asignaré el nombre \`${username}\` a tu avatar...\nSolo una pregunta más, si fallas no podrás acceder, concéntrate, ¿cuánto es 83742874382 * 10948902814?\nJe je je, es broma...\nCólocate este dispositivo en la cabeza y dale al botón rojo cada vez que quieras conectarte, recuerda que si pasas más de 6 horas inactivo se te desconectará automáticamente por motivos de seguridad cerebrales (Recuerda que es una beta, podrías morir je je je, también es una broma, creo...).\n\nUtiliza el comando \`r!connect\``);

						return msg.edit(mEmbed);
					})
					.catch((err: unknown) => client.logger.error(err))
			}
		})
}

export const name: string = 'start';
export const description: string = 'Comienza tu aventura!';
