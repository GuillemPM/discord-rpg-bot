import { Collection, CollectorFilter, Message, MessageEmbed, MessageReaction, User } from "discord.js";
import { Bot } from "../../client/Client";
import { Avatar, Inventory as InventoryModel, Item, ItemType } from "../../dbInit";
import { Command, RunFunction } from '../../interfaces/Command';
import Table from "easy-table";

export class Inventory implements Command {
  public name: string = 'inventory';
  public description: string = 'Use \`r!inventory\` to check your character\'s inventory';
  public aliases: string[] = ['i', 'inv'];
  public permisions: number = 0;
  public subcommands: Collection<string, Command> = new Collection();

  public run: RunFunction = async (client: Bot, message: Message, args: string[]) => {
    const avatar: Avatar = await Avatar.findByPk(message.author.id)
  
    const inventory: InventoryModel[] = (await InventoryModel.findAll({
      where: {
        avatarId: message.author.id
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
    })).map(v => <InventoryModel>v.get({plain: true}))
    
    const itemsPerPage = 15;
    const totalPages = Math.ceil(inventory.length / itemsPerPage);
  
    let currPage = 1;
  
    //En caso de que se invoque el comando sin argumentos
    if (!args.length) {
      const t = new Table;
  
      inventory.slice((currPage - 1) * itemsPerPage, currPage * itemsPerPage).forEach((v) => {
        //const invRow: Inventory = <Inventory>v.get({ plain: true })
        
        t.cell('#', `#${v.id}`)
        t.cell('Type', v.item.itemType.name);
        t.cell('Qty', `x${v.quantity}`);
        t.cell('Name', v.item.name);
        t.newRow();
      });
  
      const msg: Message = await message.channel.send(`\`\`\`↤↤↤↤↤ INVENTORY - PAGE(${currPage}/${totalPages}) ↦↦↦↦↦\n${t.print()}\`\`\``)
  
      if (totalPages > 1) {
        await msg.react('◀️')
        await msg.react('▶️')
      }
  
      const paginationFilter: CollectorFilter = (reaction: MessageReaction, user: User) => {
        return ['◀️', '▶️'].includes(reaction.emoji.name) && user.id === message.author.id;
      };
  
      const reactionCollector = msg.createReactionCollector(paginationFilter, { time: 60000 });
  
      reactionCollector.on('collect', async reaction => {
  
        if (reaction.emoji.name === '◀️') {
          currPage = currPage > 1 ? --currPage : totalPages;
        }
        if (reaction.emoji.name === '▶️') {
          currPage = currPage + 1 <= totalPages ? ++currPage : 1;
        }
  
        const table = new Table;
  
        inventory.slice((currPage - 1) * itemsPerPage, currPage * itemsPerPage)
          .forEach((v) => {
            table.cell('#', `#${v.id}`)
            table.cell('Type', v.item.itemType.name);
            table.cell('Qty', `x${v.quantity}`);
            table.cell('Name', v.item.name);
            table.newRow();
          });
  
        msg.edit(`\`\`\`↤↤↤↤↤ INVENTORY - PAGE(${currPage}/${totalPages}) ↦↦↦↦↦\n${table.print()}\`\`\``);
      })
    }
    //En el caso de que nos pasen mas de un argumento. 
    
  };
}