import { Sequelize } from 'sequelize';
import { Avatar } from './database/Avatar/Model/Avatar';
import { MainStats } from './database/MainStats/Model/MainStats';
import consola from "consola";

const sequelize: Sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'sqlite',
  logging: consola.debug.bind(consola),
  storage: 'database.sqlite',
  query: {
    raw: true
  }
})

const models = [Avatar, MainStats]
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

sequelize.sync({ force })
  .then(async () => {
    console.log('Database synced');
  })
  .catch(console.error);

export { Avatar, MainStats }
