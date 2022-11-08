import {DiscordTsBot} from "../class/Bot";
import {Events} from "discord.js";

export interface DiscordEvent {
    name: Events,
    once: boolean,
    action(client: DiscordTsBot, ...args: any[]): Promise<void> | void
}