import CommandContext from './commandContext';
import { PermissionsBitField } from 'discord.js';

export declare interface ICommand {
    meta: {
        name: string,
        aliases: string[],
        requiredPermissions?: bigint[],
        description?: string,
        category?: string,
    },
    execute(context: CommandContext):void;
}