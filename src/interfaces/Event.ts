import { Bot } from '../client/Client'

export interface RunFunction {
  (client: Bot, ...args: unknown[]): Promise<unknown>
}

export interface Event {
  name: string,
  run: RunFunction
}
