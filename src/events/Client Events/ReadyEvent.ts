import { Bot } from "../../client/Client";
import { RunFunction } from "../../interfaces/Event";

export const run: RunFunction = async (client: Bot) => {
  client.logger.success(`${client.user.tag} está online`)
}

export const name: string = 'ready';