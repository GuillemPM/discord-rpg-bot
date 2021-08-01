import { Message, MessageEmbed } from "discord.js";
import { Bot } from "../../client/Client";
import { GearInventory } from "../../database/GearInventory/Model/GearInventory";
import { Item } from "../../database/Item/Model/Item";
import { RunFunction } from '../../interfaces/Command'

export const run: RunFunction = async (client: Bot, message: Message) => {

  const inventory: GearInventory[] = await GearInventory.findAll({ where: { avatarId: message.author.id}, include: [{model: Item, as: 'item' }], raw: false})
  inventory.forEach((value) => {
    const a = <GearInventory>value.get({plain: true})
    console.log('GEAR INVENTORY:')
    console.log(a)
    console.log('ITEM INFO:');
    console.log(a.item)
  })
  
};

export const name: string = 'inventory';
export const description: string = 'Comienza tu aventura!';