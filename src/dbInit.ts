import { Sequelize } from 'sequelize';
import { Avatar } from './database/Avatar/Model/Avatar';
import { MainStats } from './database/MainStats/Model/MainStats';
import { AdvancedStats } from './database/AdvancedStats/Model/AdvancedStats'
import { Item } from './database/Item/Model/Item'
import consola from "consola";
import { ItemType } from './database/ItemType/Model/ItemType';
import * as initData from './dbInitData.json';
import { ItemSubtype } from './database/ItemSubtype/Model/ItemSubtype';
import { WeaponBaseStats } from './database/WeaponBaseStats/Model/WeaponBaseStats';

const sequelize: Sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'sqlite',
  logging: consola.debug.bind(consola),
  storage: 'database.sqlite',
  query: {
    raw: true
  }
})

const models = [Avatar, MainStats, AdvancedStats, ItemType, ItemSubtype, Item, WeaponBaseStats]
models.forEach(model => model.initialize(sequelize))

const force: boolean = process.argv.includes('--force') || process.argv.includes('-f');

Avatar.hasOne(MainStats, {
  sourceKey: 'id',
  foreignKey: 'avatar_id',
  as: 'mainStats',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});

MainStats.belongsTo(Avatar, {
  foreignKey: 'avatar_id',
  targetKey: 'id'
})

Avatar.hasOne(AdvancedStats, {
  sourceKey: 'id',
  foreignKey: 'avatar_id',
  as: 'advancedStats',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});

AdvancedStats.belongsTo(Avatar, {
  foreignKey: 'avatar_id',
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
  targetKey: 'id'
})

Item.hasOne(WeaponBaseStats, {
  sourceKey: 'id',
  foreignKey: 'itemid',
  as: 'weaponBaseStats',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
})

WeaponBaseStats.belongsTo(Item, {
  foreignKey: 'itemId',
  targetKey: 'id'
})

sequelize.sync({ force })
  .then(async () => {

    if (force) {
      await Avatar.bulkCreate(
        JSON.parse(JSON.stringify(initData.avatar)),
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
        JSON.parse(JSON.stringify(initData.itemType))
      )

      await ItemSubtype.bulkCreate(
        JSON.parse(JSON.stringify(initData.itemSubType))
      )

      await Item.bulkCreate(
        JSON.parse(JSON.stringify(initData.item))
      )

      await WeaponBaseStats.bulkCreate(
        JSON.parse(JSON.stringify(initData.weaponBaseStats))
      )
    }
    console.log('Database synced');
  })
  .catch(console.error);

export { Avatar, MainStats, AdvancedStats, ItemType, ItemSubtype, Item, WeaponBaseStats }