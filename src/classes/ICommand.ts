import { Message } from 'discord.js';
import CommandContext from './commandContext';

export declare interface ICommand {
    meta: {
        name: string,
        aliases: string[]
    },
    execute(context: CommandContext):void;
}