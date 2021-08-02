import { Message, MessageEmbed  } from "discord.js";
import { Bot } from "../../client/Client";
import { GearInventory } from "../../database/GearInventory/Model/GearInventory";
import { Item } from "../../database/Item/Model/Item";
import { RunFunction } from '../../interfaces/Command';
import { Avatar } from "../../database/Avatar/Model/Avatar";
import { MainStats } from "../../database/MainStats/Model/MainStats";

export const run: RunFunction = async (client: Bot, message: Message) => {
  const avatar: Avatar = await Avatar.findByPk(message.author.id, { raw: false, include: [{model: MainStats, as: 'mainStats'}]})
  const avatarValues = <Avatar>avatar.get({plain: true});

  const msg = new MessageEmbed()
  .setColor('#0099ff')
  .setTitle('Revisa tus objetos')
  .setURL('https://discord.com')
  .setDescription(`Hola \`${avatarValues.username}\`,\nthis is your inventory:`)

  const inventory: GearInventory[] = await GearInventory.findAll({ where: { avatarId: message.author.id}, include: [{model: Item, as: 'item' }], raw: false})
  inventory.forEach((v) => {
    const inv = <GearInventory>v.get({plain: true})
    const emoFind = inv.item.itemSubtypeId
    let emo : string = ""

    switch (emoFind){
      case 1: emo = "🗡"; break
      case 2: emo = "🔨"; break
      case 4: emo = "🜜";break
    };

    msg.addFields(
      { name: '\u200B', value:`${emo} ${inv.item.name} ➣ ${inv.item.description}`}
    );
  })
  return message.channel.send(msg)
};

export const name: string = 'inventory';
export const description: string = 'Comienza tu aventura!';