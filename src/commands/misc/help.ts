import { Message, MessageEmbed } from "discord.js";
import { Bot } from "../../client/Client";
import { RunFunction } from "../../interfaces/Command";

export const run: RunFunction = async (client: Bot, message: Message) => {
  let i: any = 0
  const msg = new MessageEmbed
  msg
    .setColor('#0099ff')
	  .setTitle('Check te commands!')
	  .setURL('https://discord.com')

  for(i in client.commands.array()){
    const commnd = client.commands.array()[i]
    if(commnd.permisions != 1){
      msg.addField(`${commnd.name}`, `${commnd.description} \n Aliases: ${commnd.aliases? commnd.aliases.join(', ') :'No Aliases available'}`)
    }
  }
  return message.channel.send(msg)
}

export const name: string = 'help';
export const description: string = 'Use r!help for displaying all commands that you can use'
export const permisions: number = 0