import {DiscordEvent} from "../../typings/Event";
import {Events} from "discord.js";
import {DiscordTsBot} from "../../class/Bot";
import {config} from "../../config";

const event: DiscordEvent = {
    name: Events.ClientReady,
    once: true,
    action: async (client: DiscordTsBot) => {
        const devGuild = await client.guilds.cache.get(config.guild.id);
        await devGuild?.commands.set(client.privateCommands);
        await client.application?.commands.set(client.publicCommands);
        client.user?.setActivity(config.bot.activity.name, { type: config.bot.activity.type})
        console.log("---- FIN IMPORTATION ----\nle bot est pret");
    }
}

export {event};
