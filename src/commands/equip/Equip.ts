import { Collection, CollectorFilter, Message, MessageEmbed, MessageReaction, User } from "discord.js";
import { Bot } from "../../client/Client";
import { BodyPartEnum } from "../../database/BodyPart/BodyPartEnum";
import { Inventory, Item, Gear, WeaponBaseStats } from "../../dbInit";
import { Command, RunFunction } from '../../interfaces/Command';
import { table, TableUserConfig } from 'easy-table';

export class Equip implements Command {
  public name: string = 'Equip';
  public description: string = 'Use this command to equip items \`r!equip <Item number>\`';
  public aliases: string[] = ['e', 'eq'];
  public permisions: number = 0;
  public subcommands: Collection<string, Command> = new Collection();

  public run: RunFunction = async (client: Bot, message: Message, args: string[]) => {

    const invId: number = parseInt(args[0]);
    console.log('ae')
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
    console.log(inventory)
    if (inventory) {
      console.log('2')
      const invPlain: Inventory = <Inventory>inventory.get({ plain: true });
      if (invPlain.instanceItemGuid) {
        const [gear, created] = await Gear.findOrCreate({
          defaults: {
            avatarId: message.author.id,
            [BodyPartEnum[invPlain.item.bodyPartId]]: invPlain.instanceItemGuid
          },
          where: {
            avatarId: message.author.id,
          }
        })
  
        if (created) {
          message.channel.send(`Te has equipado: ${invPlain.item.name}`)
        }
  
        if (!created) {
          console.log('4')
          if (gear[BodyPartEnum[invPlain.item.bodyPartId]] && gear[BodyPartEnum[invPlain.item.bodyPartId]] !== invPlain.instanceItemGuid) {
            console.log('5')
            const oldItem = <Inventory>(await Inventory.findOne({
              where: {
                instanceItemGuid: gear[BodyPartEnum[invPlain.item.bodyPartId]],
                avatarId: message.author.id
              },
              include: {
                model: Item,
                as: 'item'
              }, raw: false
            })).get({ plain: true })
  
  
            const oldWeaponBaseStat = await WeaponBaseStats.findByPk(oldItem.itemId);
            const newWeaponBaseStat = await WeaponBaseStats.findByPk(invPlain.itemId);
  
            const data = [
              ['', oldItem.item.name, '', invPlain.item.name],
              ['Physic Dmg', oldWeaponBaseStat.physicDmg, (newWeaponBaseStat.physicDmg - oldWeaponBaseStat.physicDmg) <= 0 ? (newWeaponBaseStat.physicDmg - oldWeaponBaseStat.physicDmg) < 0 ? '▼': '=' : '▲', newWeaponBaseStat.physicDmg],
              ['Magic Dmg', oldWeaponBaseStat.magicDmg, (newWeaponBaseStat.magicDmg - oldWeaponBaseStat.magicDmg) <= 0 ? (newWeaponBaseStat.magicDmg - oldWeaponBaseStat.magicDmg) < 0 ? '▼': '=' : '▲', newWeaponBaseStat.magicDmg],
              ['Speed', oldWeaponBaseStat.speed, (newWeaponBaseStat.speed - oldWeaponBaseStat.speed) <= 0 ? (newWeaponBaseStat.speed - oldWeaponBaseStat.speed) < 0 ? '▼': '=' : '▲', newWeaponBaseStat.speed]
            ];
            
            const config: TableUserConfig = {
              drawVerticalLine: (lineIndex, columnCount) => {
                return lineIndex === 0 || lineIndex === 1 || lineIndex === columnCount;
              },
              columns: [
                { alignment: 'center', width: 6, wrapWord: true },
                { alignment: 'right', width: 6, wrapWord: true },
                { alignment: 'center', width: 3, wrapWord: true },
                { alignment: 'left', width: 6, wrapWord: true }
              ]
            };
          
            const msg: Message = await message.channel.send(`\`\`\`CSS\n¿Seguro que deseas equiparte [${invPlain.item.name}] en lugar de [${oldItem.item.name}]?\n\n${table(data, config)}\`\`\``)
            msg.react('❌').then(() => msg.react('✅'));
  
            const filter: CollectorFilter = (reaction: MessageReaction, user: User) => {
              return ['❌', '✅'].includes(reaction.emoji.name) && user.id === message.author.id;
            };
  
            msg.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
              .then(collected => {
                const reaction = collected.first();
  
                if (reaction.emoji.name === '✅') {
                  Gear.update({ [BodyPartEnum[invPlain.item.bodyPartId]]: invPlain.instanceItemGuid }, { where: { avatarId: message.author.id } })
                    .then(v => message.channel.send(`Te has equipado: ${invPlain.item.name}`))
                } else {
                  // message.channel.send('Vale crack')
                }
              })
          }
        }
      }
    }
  }
}