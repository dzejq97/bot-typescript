import { Message, User } from 'discord.js';
import { ICommand } from './ICommand';
import client from '../client';

export default class CommandContext {
    directMessage: Message;
    authorUser: User;
    command: ICommand;
    arguments: string[];
    usedAlias: string | undefined;
    client = client;

    constructor(message: Message, command:ICommand, args: string[], usedAlias?: string) {
        this.directMessage = message;
        this.arguments = args;
        this.authorUser = message.author;
        this.command = command;

        if (typeof usedAlias === undefined) this.usedAlias = command.meta.name;
        else this.usedAlias = usedAlias;
    }

    argumentIsMention(arg: string) {
        if (arg == undefined) return false;

        if (arg.startsWith('<@') && arg.endsWith('>'))
            return true;
        else
            return false;
    }
}