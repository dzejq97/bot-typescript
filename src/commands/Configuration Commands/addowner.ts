import { ICommand } from "src/classes/ICommand";
import CommandContext from "src/classes/commandContext";
import { PermissionsBitField } from "discord.js";

export const command: ICommand = {
    meta: {
        name: 'addowner',
        aliases: ['conf'],
        description: "Give admin privilages",
        requiredPermissions: [PermissionsBitField.Flags.Administrator]
    },
    execute(context: CommandContext) {
        return;
    }
}