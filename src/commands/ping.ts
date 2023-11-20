import { ICommand } from "src/classes/ICommand";
import CommandContext from "src/classes/commandContext";

export const command: ICommand = {
    meta: {
        name: 'ping',
        aliases: ['pong'],
        description: "Reply with 'Pong!'"
    },
    execute(context: CommandContext) {
        if (context.usedAlias === 'pong') context.directMessage.reply('Ping!')
        else context.directMessage.reply('Pong!');
    }
}