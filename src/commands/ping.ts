import { ICommand } from "src/classes/ICommand";
import { Message } from 'discord.js'

export const command: ICommand = {
    meta: {
        name: 'ping',
        aliases: ['pong', 'test'],
    },
    execute(message: Message, args: string[]) {
        message.reply('pong!');
    }
}