import { Message, MessageEmbed  } from "discord.js";
import { Bot } from "../../client/Client";
import { GearInventory } from "../../database/GearInventory/Model/GearInventory";
import { Item } from "../../database/Item/Model/Item";
import { RunFunction } from '../../interfaces/Command';
import { Avatar } from "../../database/Avatar/Model/Avatar";
import { MainStats } from "../../database/MainStats/Model/MainStats";


export const run: RunFunction = async (client: Bot, message: Message, args: string[]) => {
  const avatar: Avatar = await Avatar.findByPk(message.author.id, { raw: false, include: [{model: MainStats, as: 'mainStats'}]})
  const avatarValues = <Avatar>avatar.get({plain: true});
  const inventory: GearInventory[] = await GearInventory.findAll({ where: { avatarId: message.author.id}, include: [{model: Item, as: 'item' }], raw: false})
  //En caso de que se invoque el comando sin argumentos
  if(!args.length){
  const msg = new MessageEmbed()
  .setColor('#0099ff')
  .setTitle('Revisa tus objetos')
  .setURL('https://discord.com')
  .setDescription(`Hola \`${avatarValues.username}\`,\nthis is your inventory:`)

  inventory.forEach((v) => {
    const inv = <GearInventory>v.get({plain: true})
    //Esto es opcional para lo de los inconitos
    const emoFind = inv.item.itemSubtypeId
    let emo : string = ""
    
    switch (emoFind){
      case 1: emo = "🗡"; break
      case 2: emo = "🔨"; break
      case 4: emo = "🜜";break
    };
    //########################################
    msg.addFields(
      { name: '\u200B', value:`${emo} ${inv.item.name} ➣ ${inv.item.description}`}
    )
  })
  return message.channel.send(msg)
  };
  //En el caso de que nos pasen mas de un argumento. 
  if(args[0] == 'detail'){
    //Controlamos que se pasen dos argumentos, el detail y un numero.
    if(args[1]){
      const ind: number = parseInt(args[1])
      if(ind <= inventory.length){
        //Iteramos por todos los objetos en Gear Inventory hasta que en contramos el nuestro. <-- Guilleeeeeeeeeeee AUXILI!
        let a = 1
        inventory.forEach((i) => {
          if(a == ind){
            //En cuanto llegamos a la iteracion que nos interesa devolvemos un mensaje seleccionando los stats de las armas.
            const ite = <GearInventory>i.get({plain: true})
            
          }else{
            a++
          }
        })
      }else{
        //En caso de que el numero que de el usuario sea mas grande que la cantidad total de Items en el inventario.
        const msg = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Error!')
        .setURL('https://discord.com')
        .setDescription(`The item number does not exist\n Number of items in your inventory:  ${inventory.length}`)
        return message.channel.send(msg)
      }
    }else{
      //En caso de que no se pase el segundo argumento.
      const msg = new MessageEmbed()
      .setColor('#0099ff')
      .setTitle('You need to specify an Item number!')
      .setURL('https://discord.com')
      .setDescription(`Command usage: r!inventory detail <Item Number>`)
      return message.channel.send(msg)
    }
  }else{
    //En caso de que no especifiquen el detail.
    const msg = new MessageEmbed()
      .setColor('#0099ff')
      .setTitle('Wrong!')
      .setURL('https://discord.com')
      .setDescription(`Command usage: r!inventory detail <Item Number>`)
    return message.channel.send(msg)
  }

};

export const name: string = 'inventory';