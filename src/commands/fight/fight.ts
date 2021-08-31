import { Collection, Message, MessageEmbed } from "discord.js";
import { Bot } from "../../client/Client";
import { Avatar } from "../../database/Avatar/Model/Avatar";
import { Combat } from "../../database/Combat/Model/Combat";
import { Command, RunFunction } from '../../interfaces/Command'
import { v4 } from "uuid";

export class Fight implements Command {
  public name: string = 'fight';
  public description: string = 'Use the r!figh command to fight nearby foes!';
  public aliases: string[] = ['f', 'fht'];
  public permisions: number = 0;
  public subcommands: Collection<string, Command> = new Collection();
  
  public run: RunFunction = async (client: Bot, message: Message) => {
    console.log('hola')
    const prevCombat = await Combat.findByPk(message.author.id)
    if(prevCombat == null){
      const mobs: number[] = [1]

      const cmbt = new Combat
      cmbt.combatId = v4()
      cmbt.avatarId = message.author.id
      cmbt.mobId = mobs.toString()



      console.log(`Nuevo combate ${cmbt.combatId},${cmbt.avatarId},${cmbt.mobId}`)
    }else{
      console.log(`Ya tienes un combate ${prevCombat.combatId},${prevCombat.avatarId},${prevCombat.mobId}`)
    }
  }
}