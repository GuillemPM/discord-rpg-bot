import { Message, MessageEmbed } from "discord.js";
import { Bot } from "../../client/Client";
import { RunFunction } from "../../interfaces/Command";
import Table from "easy-table"

export const run: RunFunction = async (client: Bot, message: Message) => {
  const table = new Table();
  let i: any = 0
  const msg = new MessageEmbed
  msg
    .setColor('#0099ff')
	  .setTitle('Check te commands!')
	  .setURL('https://discord.com')

  for(i in client.commands.array()){
    if(client.commands.array()[i].permisions != 1){
      msg.addField(`${client.commands.array()[i].name}`,`${client.commands.array()[i].description}`)
    }
  }
  return message.channel.send(msg)
  //const msg: Message = await message.channel.send(`${table.print()}`)
}

export const name: string = 'help';
export const description: string = 'Use r!help for displaying all commands that you can use'
export const permisions: number = 0