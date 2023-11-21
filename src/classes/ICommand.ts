import CommandContext from './commandContext';

export declare interface ICommand {
    meta: {
        name: string,
        aliases: string[],
        description?: string,
        category?: string,
    },
    execute(context: CommandContext):void;
}