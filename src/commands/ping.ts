import { ICommand } from "src/classes/ICommand";
import CommandContext from "src/classes/commandContext";
import { Message } from 'discord.js'

export const command: ICommand = {
    meta: {
        name: 'ping',
        aliases: ['pong', 'test'],
    },
    execute(context: CommandContext) {
        return;
    }
}