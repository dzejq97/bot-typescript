import { ICommand } from "src/classes/ICommand";
import CommandContext from "src/classes/commandContext";
import { PermissionsBitField } from "discord.js";

export const command: ICommand = {
    meta: {
        name: 'kick',
        aliases: [],
        description: "Kick member from guild.",
        requiredPermissions: [PermissionsBitField.Flags.KickMembers]
    },
    execute(context: CommandContext) {
        if (!context.verifyPermissions()) return;

        console.log('Kick')
    }
}