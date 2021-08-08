import { Message } from "discord.js";
import { Bot } from "../../client/Client";
import { BodyPartEnum } from "../../database/BodyPart/BodyPartEnum";
import { Inventory, Item, Gear } from "../../dbInit";
import { RunFunction } from '../../interfaces/Command'

export const run: RunFunction = async (client: Bot, message: Message, args: string[]) => {

  const invId: number = parseInt(args[0]);

  const inventory: Inventory = await Inventory.findOne({ 
    where: {
      id: invId,
      avatarId: message.author.id
    },
    include: {
      model: Item,
      as: 'item'
    }, raw: false
  })

  if (inventory) {
    const invPlain: Inventory = <Inventory>inventory.get({plain: true});

    const [gear, created] = await Gear.findOrCreate({ 
      defaults: {
        avatarId: message.author.id,
        [BodyPartEnum[invPlain.item.bodyPartId]]: invPlain.instanceItemGuid
      },
      where: { 
        avatarId: message.author.id,
      }
    })
    
    if (!created) {
      if (gear[BodyPartEnum[invPlain.item.bodyPartId]] && gear[BodyPartEnum[invPlain.item.bodyPartId]] !== invPlain.instanceItemGuid) {
        message.channel.send(`Seguro que deseas equiparte ${invPlain.instanceItemGuid} en lugar de ${gear[BodyPartEnum[invPlain.item.bodyPartId]]}`)
      }
      Gear.update({ [BodyPartEnum[invPlain.item.bodyPartId]]: invPlain.instanceItemGuid}, { where: { avatarId: message.author.id }} )
    }

    //inventory.update({ equiped: true })
    
  }
};

export const name: string = 'equip';
export const description: string = 'Equip';
export const aliases: string[] = ['e', 'eq'];