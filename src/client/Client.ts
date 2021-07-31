import consola, { Consola } from "consola";
import { Client, Collection } from "discord.js";
import glob from 'glob';
import { Command } from "../interfaces/Command";
import { ConfigOptions } from "../interfaces/ConfigOptions";
import { Event } from "../interfaces/Event";
import { promisify } from "util";

const globPromise = promisify(glob);

class Bot extends Client {

  public logger: Consola = consola;
  public commands: Collection<string, Command> = new Collection();
  public events: Collection<string, Event> = new Collection();
  public configOptions: ConfigOptions;

  public async start(configOptions: ConfigOptions): Promise<void> {
    this.configOptions = configOptions;

    this.login(this.configOptions.token);

    const commandFiles: string[] = await globPromise(`${__dirname}/../commands/**/*{.ts,.js}`);
    
    commandFiles.map(async (value: string) => {
      const file: Command = await import(value);
      this.commands.set(file.name, file);
    });

    const eventFiles: string[] = await globPromise(`${__dirname}/../events/**/*{.ts,.js}`);
    eventFiles.map(async (value: string) => {
      const file: Event = await import(value);
      this.events.set(file.name, file);

      this.on(file.name, file.run.bind(null, this))
    });
  }
}

export { Bot };