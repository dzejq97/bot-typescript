import { Message, User } from 'discord.js';
import { ICommand } from './ICommand';
import client from 'src/client';

export default class CommandContext {
    directMessage: Message;
    authorUser: User;
    command: ICommand;
    arguments: string[];

    constructor(message: Message, command:ICommand, ...args:any[]) {
        this.directMessage = message;

        this.arguments = args[0];
        this.authorUser = message.author;
        this.command = command;
    }

    argumentIsMention(arg: string) {
        if (arg == undefined) return false;

        if (arg.startsWith('<@') && arg.endsWith('>'))
            return true;
        else
            return false;
    }
}