import {ApplicationCommandType, CommandInteraction, EmbedBuilder} from "discord.js";
import {DiscordCommand} from "../../typings/Interaction";
import {DiscordTsBot} from "../../class/Bot";

const cmd: DiscordCommand = {
    name: "ping",
    description: "Affiche les informations du projet en ligne (latence, version, ...)",
    isPublic: true,
    type: ApplicationCommandType.ChatInput,
    dmPermission: false,
    action: (client: DiscordTsBot, interaction: CommandInteraction) => {
        const githubAuteurURL: RegExp = /^https:\/\/github\.com\/.*$/;
        const embed = new EmbedBuilder()
            .setTitle(`:robot: Projet : ${process.env.npm_package_name} :robot:`)
            .setURL(`${process.env.npm_package_repository_url}`)
            .setColor("#55acee")
            // @ts-ignore
            .setDescription(`${process.env.npm_package_description}\n\n*Dernier chargement des commandes : <t:${Math.floor(client.readyTimestamp/1000)}:R>*`)
            .setThumbnail(`${client.user?.displayAvatarURL()}`)
            .setAuthor({
                name: `Auteur : ${process.env.npm_package_author_name}`,
                url: `${process.env.npm_package_author_url}`,
                iconURL: githubAuteurURL.test(`${process.env.npm_package_author_url}`) ? `${process.env.npm_package_author_url}.png` : `https://cdn.icon-icons.com/icons2/196/PNG/128/dev_23828.png`
            })
            .addFields([
                {
                    name: "--",
                    value: "Information sur le serveur",
                    inline: false
                },
                {
                    name: "OS du serveur",
                    value: `\`\`\`${process.platform} (${process.arch})\`\`\``,
                    inline: true
                },
                {
                    name: "Version Node.js",
                    value: `\`\`\`${process.versions.node}\`\`\``,
                    inline: true
                },
                {
                    name: "Version projet",
                    value: `\`\`\`${process.env.npm_package_version}\`\`\``,
                    inline: true
                },
                {
                    name: "Licence",
                    value: `\`\`\`${process.env.npm_package_license}\`\`\``,
                    inline: true
                },
                {
                    name: "--",
                    value: "Information sur la latence",
                    inline: false
                },
                {
                    name: "API Discord",
                    value: `\`\`\`${client.ws.ping}ms\`\`\``,
                    inline: true
                },
                {
                    name: "API EDT",
                    value: `\`\`\`Non implémentée\`\`\``,
                    inline: true
                },
                {
                    name: "Interaction",
                    value: `\`\`\`${Date.now() - interaction.createdTimestamp}ms\`\`\``,
                    inline: true
                }
            ])
            .setFooter({
                text: `${interaction.user.username}#${interaction.user.discriminator}`,
                iconURL: interaction.user.displayAvatarURL()
            })
            .setTimestamp()
        interaction.editReply({embeds: [embed]});
    }
}

export {cmd};
