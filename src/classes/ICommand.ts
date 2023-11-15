import { Message } from 'discord.js';

export declare interface ICommand {
    meta: {
        name: string,
        aliases: string[]
    },
    execute(message: Message, args: string[]):void;
}