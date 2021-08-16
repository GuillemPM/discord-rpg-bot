import { Collection, Message, MessageEmbed } from "discord.js";
import { Bot } from "../../client/Client";
import { Command, RunFunction } from "../../interfaces/Command";

export class Help implements Command {
  public name: string = 'Help';
  public description: string = 'Use r!help for displaying all commands that you can use';
  public aliases: string[] = ['h'];
  public permisions: number = 0;
  public subcommands: Collection<string, Command> = new Collection();

  public run: RunFunction = async (client: Bot, message: Message, args: string[]) => {
    if(!args.length){
      const msg = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Check te commands!')
        .setURL('https://discord.com')
    
      client.commands.forEach(cmd => {
        if (cmd.permisions !== 1) {
          msg.addField(`[${cmd.name}]`, `${cmd.description}\nAliases: ${cmd.aliases ? cmd.aliases.join(', ') : 'No aliases available'}`)
        }
      })
      return message.channel.send(msg)
    } else {
      if(client.commands.has(args[0])){
        const cmd : Command = client.commands.get(args[0])
        
        const msg = new MessageEmbed()
          .setColor('#0099ff')
          .setTitle(`${cmd.name}`)
          .setURL('https://discord.com')
          .setDescription(`${cmd.description}`)
           
        cmd.subcommands.forEach(scmd => {
          msg.addField(`Subcommand: \`${scmd.name}\``, `${scmd.description}`)
        })
        return message.channel.send(msg)
      }else{
        const msg = new MessageEmbed()
          .setColor('#0099ff')
          .setTitle('Watch out that command does not exist')
          .setURL('https://discord.com')
        return message.channel.send(msg)
      }
    }
  }  
}