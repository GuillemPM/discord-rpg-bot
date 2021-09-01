import { Collection, Message, MessageEmbed } from "discord.js";
import { Bot } from "../../client/Client";
import { Combat } from "../../database/Combat/Model/Combat";
import { Command, RunFunction } from '../../interfaces/Command'
import { v4 } from "uuid";
import { createNewCombat } from "../../database/Combat/createCombat";

export class Fight implements Command {
  public name: string = 'fight';
  public description: string = 'Use the r!figh command to fight nearby foes!';
  public aliases: string[] = ['f', 'fht'];
  public permisions: number = 0;
  public subcommands: Collection<string, Command> = new Collection();
  
  public run: RunFunction = async (client: Bot, message: Message) => {
    const prevCombat = await Combat.findOne({
      where: {
        avatarId: message.author.id
      },
    })
    if(prevCombat){
      console.log(`Ya tienes un combate en marcha!`)
    }else{
      const mobs: number[] = [1,2,3,4,5,6]

      const cmbt = new Combat
      cmbt.combatId = v4()
      cmbt.avatarId = message.author.id
      cmbt.mobId = mobs.toString()

      createNewCombat(cmbt.combatId,cmbt.avatarId,cmbt.mobId)

      console.log(`Nuevo combate ${cmbt.combatId},${cmbt.avatarId},${cmbt.mobId}`)
    }
  }
}