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

  const inventory: Inventory[] = await Inventory.findAll({
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
  })

  const itemsPerPage = 15;
  const totalPages = Math.ceil(inventory.length / itemsPerPage);

  let currPage = 1;

  //En caso de que se invoque el comando sin argumentos
  if (!args.length) {
    const t = new Table;

    inventory.slice((currPage - 1) * itemsPerPage, currPage * itemsPerPage).forEach((v) => {
      const invRow: Inventory = <Inventory>v.get({ plain: true })
      t.cell('#', `#${invRow.id}`)
      t.cell('Type', invRow.item.itemType.name);
      t.cell('Qty', `x${invRow.quantity}`);
      t.cell('Name', invRow.item.name);
      t.newRow();
    });

    const msg: Message = await message.channel.send(`\`\`\`Page(${currPage}/${totalPages}):\n${t.print()}\`\`\``)

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
          const invRow: Inventory = <Inventory>v.get({ plain: true })
          table.cell('#', `#${invRow.id}`)
          table.cell('Type', invRow.item.itemType.name);
          table.cell('Qty', `x${invRow.quantity}`);
          table.cell('Name', invRow.item.name);
          table.newRow();
        });

      msg.edit(`\`\`\`Page(${currPage}/${totalPages}):\n${table.print()}\`\`\``);
    })
  }
  //En el caso de que nos pasen mas de un argumento. 
  if (args[0] == 'detail') {
    //Controlamos que se pasen dos argumentos, el detail y un numero.
    if (args[1]) {
      const itemNo: number = parseInt(args[1])

      if (itemNo) {
        const item: Item = (<Inventory>inventory.filter(v => v.id == itemNo)[0].get({plain: true})).item;
        //const item: Item = (<Inventory>inventory[itemNo - 1].get({ plain: true })).item;
        const msg = new MessageEmbed()
          .setColor('#0099ff')
          .setTitle('Revisa tus objetos')
          .setURL('https://discord.com')
          .setDescription(`Hola \`${avatar.username}\`,\nthis is your inventory:`)
          .addFields(
            { name: 'Type', value: item.itemType.name, inline: true },
            { name: 'Name', value: `(#${itemNo}) ${item.name}`, inline: true },
            // { name: 'Quantity', value: item.quantity, inline: true},
            { name: 'Description', value: item.description }

          )
        return message.channel.send(msg)
      }
      /*if (ind <= gearInventory.length) {
        
      } else {
        //En caso de que el numero que de el usuario sea mas grande que la cantidad total de Items en el inventario.
        const msg = new MessageEmbed()
          .setColor('#0099ff')
          .setTitle('Error!')
          .setURL('https://discord.com')
          .setDescription(`The item number does not exist\n Number of items in your inventory:  ${gearInventory.length}`)
        return message.channel.send(msg)
      }*/
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