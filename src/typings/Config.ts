import {ActivityType} from "discord.js";

export interface BotConfig {
    bot: {
        token: string;
        activity: {
            type: ActivityType.Playing | ActivityType.Streaming | ActivityType.Listening | ActivityType.Watching | ActivityType.Competing,
            name: string
        }
    }
    guild: {
        id: string;
    }
}
