import { Message } from 'discord.js';
import CommandContext from './commandContext';

export declare interface ICommand {
    meta: {
        name: string,
        aliases: string[],
        description?: string
    },
    execute(context: CommandContext):void;
}