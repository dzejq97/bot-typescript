import { ICommand } from "src/classes/ICommand";
import CommandContext from "src/classes/commandContext";

export const command: ICommand = {
    meta: {
        name: 'ping',
        aliases: ['pong', 'test'],
        description: "Reply with 'Pong!'"
    },
    execute(context: CommandContext) {
        context.directMessage.reply('Pong!');
    }
}