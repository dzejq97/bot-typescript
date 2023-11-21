// @ts-ignore
import { ICommand } from "src/classes/ICommand";
import CommandContext from "src/classes/commandContext";
import { EmbedBuilder } from "discord.js";

export const command: ICommand = {
    meta: {
        name: 'ping',
        aliases: ['pong'],
        description: "Reply with 'Pong!",
    },
    execute(context: CommandContext) {
        if (context.usedAlias === 'pong') return context.directMessage.reply({embeds: [context.embeds.infoEmbed('Ping!')]})
        else return context.directMessage.reply({embeds: [context.embeds.infoEmbed('Pong!')]})
    }
}