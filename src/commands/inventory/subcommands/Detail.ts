import { Collection, Message, MessageEmbed } from "discord.js";
import { isNull } from "node:util";
import { Bot } from "../../../client/Client";
import { Inventory, Item, ItemType } from "../../../dbInit";
import { Command, RunFunction } from "../../../interfaces/Command";

export class Detail implements Command {
  public name: string = 'detail';
  public description: string = 'Use r!inventory to check yout character inventory detail <Item Number>';
  public aliases: string[] = ['d', 'dt'];
  public permisions: number = 0;
  public subcommands: Collection<string, Command> = new Collection();

  public run: RunFunction = async (client: Bot, message: Message, args: string[]) => {
    if (!args[0]) return message.channel.send('Command usage: \`r!inventory detail <Identifier>\`')

    const invId: number = parseInt(args[0])

    if (!invId) return message.channel.send('Command usage: \`r!inventory detail <Identifier>\`')

    const inventory: Inventory = <Inventory>(await Inventory.findOne({
      where: {
        avatarId: message.author.id,
        id: invId
      },
      include: [
        {
          model: Item,
          as: 'item',
          include: [
            {
              model: ItemType,
              as: 'itemType'
            }
          ]
        }
      ], raw: false
    }));

    if (!inventory) return message.channel.send('El id indicado no existe');

    const invPlain: Inventory = <Inventory>inventory.get({ plain: true })
    const msg = new MessageEmbed()
      .setColor('#0099ff')
      .setTitle(`#${invPlain.id} - ${invPlain.item.name}`)
      .setURL('https://discord.com')
      .setDescription(invPlain.item.description)
      .addFields(
        { name: 'Type', value: invPlain.item.itemType.name, inline: true },
        { name: 'Quantity', value: invPlain.quantity, inline: true}
      )
    
      return message.channel.send(msg)
  }
}