import { Collection, Message } from "discord.js";
import { Bot } from "../../client/Client";
import { Avatar } from "../../dbInit";
import { Command, RunFunction } from "../../interfaces/Command";

export class Experience implements Command {
  public name: string = 'Experience';
  public description: string = 'Use r!experience for displaying all commands that you can use';
  public aliases: string[] = ['xp'];
  public permisions: number = 0;
  public subcommands: Collection<string, Command> = new Collection();

  public run: RunFunction = async (client: Bot, message: Message, args: string[]) => {

    const avatar = await Avatar.findByPk(message.author.id, { raw: false });
    //avatar.update({totalExp: 10})
    avatar.addExperience(parseInt(args[0]));

  }
  
}