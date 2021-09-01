import { Sequelize } from 'sequelize';
import { Avatar } from './database/Avatar/Model/Avatar';
import { MainStats } from './database/MainStats/Model/MainStats';
import { AdvancedStats } from './database/AdvancedStats/Model/AdvancedStats'
import { Item } from './database/Item/Model/Item'
import consola from "consola";
import { ItemType } from './database/ItemType/Model/ItemType';
//import * as initData from './dbInitData.json';
import { ItemSubtype } from './database/ItemSubtype/Model/ItemSubtype';
import { WeaponBaseStats } from './database/WeaponBaseStats/Model/WeaponBaseStats';
import { Inventory } from './database/Inventory/Model/Inventory';
import { Gear } from './database/Gear/Model/Gear';
import { BodyPart } from './database/BodyPart/Model/BodyPart';
import { Mobs } from './database/mobs/Model/mobs';
import { Combat } from './database/Combat/Model/Combat';
import { Region } from './database/Region/Model/Region';
import * as Avatars from './database/_INITIAL_DATA/Avatars.json';
import * as BodyParts from './database/_INITIAL_DATA/BodyParts.json';
import * as Inventories from './database/_INITIAL_DATA/Inventories.json';
import * as Items from './database/_INITIAL_DATA/Items.json';
import * as ItemSubtypes from './database/_INITIAL_DATA/ItemSubtypes.json';
import * as ItemTypes from './database/_INITIAL_DATA/ItemTypes.json';
import * as WeaponBaseStatss from './database/_INITIAL_DATA/WeaponBaseStats.json';



const sequelize: Sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'sqlite',
  logging: consola.debug.bind(consola),
  storage: 'database.sqlite',
  query: {
    raw: true
  }
})

const models = [BodyPart, Avatar, MainStats, AdvancedStats, ItemType, ItemSubtype, Item, WeaponBaseStats, Inventory, Gear, Mobs, Combat, Region]
models.forEach(model => model.initialize(sequelize))

const force: boolean = process.argv.includes('--force') || process.argv.includes('-f');

Avatar.hasOne(MainStats, {
  sourceKey: 'id',
  foreignKey: 'avatarId',
  as: 'mainStats',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});

MainStats.belongsTo(Avatar, {
  foreignKey: 'avatarId',
  targetKey: 'id'
})

Avatar.hasOne(AdvancedStats, {
  sourceKey: 'id',
  foreignKey: 'avatarId',
  as: 'advancedStats',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});

AdvancedStats.belongsTo(Avatar, {
  foreignKey: 'avatarId',
  targetKey: 'id'
})

ItemType.hasMany(ItemSubtype, {
  sourceKey: 'id',
  foreignKey: 'itemTypeId',
  as: 'itemSubtype',
  onUpdate: 'CASCADE'
})

ItemType.hasMany(Item, {
  sourceKey: 'id',
  foreignKey: 'itemTypeId',
  as: 'item',
  onUpdate: 'CASCADE'
})

ItemSubtype.belongsTo(ItemType, {
  foreignKey: 'itemTypeId',
  targetKey: 'id'
})

ItemSubtype.hasMany(Item, {
  sourceKey: 'id',
  foreignKey: 'itemSubtypeId',
  as: 'itemSubtype',
  onUpdate: 'CASCADE'
})

Item.belongsTo(ItemSubtype, {
  foreignKey: 'itemSubtypeId',
  targetKey: 'id'
})

Item.belongsTo(ItemType, {
  foreignKey: 'itemTypeId',
  targetKey: 'id',
  as: 'itemType'
})

Item.hasOne(WeaponBaseStats, {
  sourceKey: 'id',
  foreignKey: 'itemId',
  as: 'weaponBaseStats',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
})

WeaponBaseStats.belongsTo(Item, {
  foreignKey: 'itemId',
  targetKey: 'id'
})

Avatar.hasMany(Inventory, {
  sourceKey: 'id',
  foreignKey: 'avatarId',
  as: 'inventory',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
})

Inventory.belongsTo(Avatar, {
  foreignKey: 'avatarId',
  targetKey: 'id'
});

Item.hasMany(Inventory, {
  sourceKey: 'id',
  foreignKey: 'itemId',
  as: 'inventory',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
})

Inventory.belongsTo(Item, {
  foreignKey: 'itemId',
  targetKey: 'id',
  as: 'item'
})

sequelize.sync({ force })
  .then(async () => {

    if (force) {
      await BodyPart.bulkCreate(
        JSON.parse(JSON.stringify(BodyParts.list))
      )

      await Avatar.bulkCreate(
        JSON.parse(JSON.stringify(Avatars.list)),
        {
          include: [{
            model: MainStats,
            as: 'mainStats'
          },
          {
            model: AdvancedStats,
            as: 'advancedStats'
          }]
        }
      )

      await ItemType.bulkCreate(
        JSON.parse(JSON.stringify(ItemTypes.list))
      )

      await ItemSubtype.bulkCreate(
        JSON.parse(JSON.stringify(ItemSubtypes.list))
      )

      await Item.bulkCreate(
        JSON.parse(JSON.stringify(Items.list))
      )

      await WeaponBaseStats.bulkCreate(
        JSON.parse(JSON.stringify(WeaponBaseStatss.list))
      )

      await Inventory.bulkCreate(
        JSON.parse(JSON.stringify(Inventories.list))
      )
    }
    console.log('Database synced');
  })
  .catch(console.error);

export { 
  Avatar, 
  MainStats, 
  AdvancedStats, 
  ItemType, 
  ItemSubtype, 
  Item, 
  WeaponBaseStats, 
  Inventory, 
  Gear,
  BodyPart,
  Region,
  Mobs,
  Combat
}