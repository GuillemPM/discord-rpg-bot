import { Collection, Message, MessageEmbed } from "discord.js";
import { Bot } from "../../client/Client";
import { Command, RunFunction } from "../../interfaces/Command";

export class Help implements Command {
  public name: string = 'help';
  public description: string = 'Use \`r!help\` for displaying all commands that you can use';
  public aliases: string[] = ['h'];
  public permisions: number = 0;
  public subcommands: Collection<string, Command> = new Collection();

  public run: RunFunction = async (client: Bot, message: Message, args: string[]) => {
    if (!args.length) {

      const msg = new MessageEmbed()
        .setColor('#cd7f32')
        .setTitle('Check te commands!')
        .setURL('https://discord.com')

      client.commands.forEach(cmd => {
        if (cmd.permisions !== 1) {
          msg.addField(`[${cmd.name}]`, `${cmd.description}\nAliases: ${cmd.aliases ? cmd.aliases.join(', ') : 'No aliases available'}`)
        }
      })
      return message.channel.send(msg)
    } 
    
    const commandName: string = args[0];
    if (commandName) {
      const cmd: Command = client.commands.get(commandName) || client.commands.find(command => command.aliases && command.aliases.includes(commandName));
      
      if (!cmd) return message.channel.send(`The command \`${commandName}\` doesn't exists`)
      let subcommandsDescription: string = '';
      cmd.subcommands.forEach(scmd => {
        subcommandsDescription = subcommandsDescription.concat(`**${scmd.name}**: ${scmd.description}\nAliases: \`${scmd.aliases.join(', ')}\``)
      })

      let cmdTitle: string = `━━ ${cmd.name[0].toUpperCase() + cmd.name.slice(1)} `;

      for (let i = 0; i < 14 - Math.round(cmd.name.length / 5); i++) {
        cmdTitle = cmdTitle.concat('━')
      }

      const msg = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle(cmdTitle)
        .setURL('https://discord.com')
        .setDescription(`${cmd.description}${cmd.subcommands ? `\n\n▫**Subcommands**▫\n${subcommandsDescription}` : ''}`)

      return message.channel.send(msg)
    }
  }
}