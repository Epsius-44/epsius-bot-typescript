import {DiscordEvent} from "../../typings/Event";
import {CommandInteraction, Events, InteractionType} from "discord.js";
import {DiscordTsBot} from "../../class/Bot";

const event: DiscordEvent = {
    name: Events.InteractionCreate,
    once: false,
    action: (client: DiscordTsBot, interaction: CommandInteraction) => {
        if(interaction.type === InteractionType.ApplicationCommand){
            const cmd = client.commandsCollection.get(interaction.commandName);
            if (!cmd) {
                interaction.reply({
                    content: `La commande \`${interaction.commandName}\` n'existe pas !`, ephemeral: true
                })
                return
            }
            interaction.deferReply().then(() => cmd.action(client, interaction))
        }
    }
}

export {event};
