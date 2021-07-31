import { ConfigOptions } from './interfaces/ConfigOptions';
import { config } from 'dotenv';
import * as File from './config.json';
import { Bot } from './client/Client';
config();

const bot: Bot = new Bot();
const configOptions: ConfigOptions = { token: process.env.DISCORD_TOKEN, ...File as ConfigOptions };

bot.start(configOptions);