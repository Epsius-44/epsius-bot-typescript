import {ApplicationCommandData} from "discord.js";
import {DiscordTsBot} from "../class/Bot";

export type DiscordCommand = ApplicationCommandData & {
    isPublic?: boolean
    action(client: DiscordTsBot, ...args: any[]): Promise<void> | void
}