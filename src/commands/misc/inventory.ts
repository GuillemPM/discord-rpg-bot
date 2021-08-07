import { CollectorFilter, Message, MessageEmbed, MessageReaction, User } from "discord.js";
import { Bot } from "../../client/Client";
import { Item } from "../../database/Item/Model/Item";
import { RunFunction } from '../../interfaces/Command';
import { Avatar } from "../../database/Avatar/Model/Avatar";
import { Inventory } from "../../database/Inventory/Model/Inventory";
import { ItemType } from "../../database/ItemType/Model/ItemType";
import Table from "easy-table";

export const run: RunFunction = async (client: Bot, message: Message, args: string[]) => {
  const avatar: Avatar = await Avatar.findByPk(message.author.id)

  const inventory: Inventory[] = (await Inventory.findAll({
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
  })).map(v => <Inventory>v.get({plain: true}))
  console.log(inventory);
  
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
  if (args[0] == 'detail') {
    //Controlamos que se pasen dos argumentos, el detail y un numero.
    if (args[1]) {
      const invId: number = parseInt(args[1])

      if (invId) {
        const invRow = inventory.filter(v => v.id === invId)[0];
        if  (invRow) {
          const msg = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle(`#${invRow.id} - ${invRow.item.name}`)
            .setURL('https://discord.com')
            .setDescription(invRow.item.description)
            .addFields(
              { name: 'Type', value: invRow.item.itemType.name, inline: true },
              { name: 'Quantity', value: invRow.quantity, inline: true}
            )
            return message.channel.send(msg)
        }
      }
    } else {
      //En caso de que no se pase el segundo argumento.
      const msg = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle('You need to specify an Item number!')
        .setURL('https://discord.com')
        .setDescription(`Command usage: r!inventory detail <Item Number>`)
      return message.channel.send(msg)
    }
  }
};

export const name: string = 'inventory';