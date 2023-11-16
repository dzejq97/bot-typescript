import { Message, User } from 'discord.js';
import { ICommand } from './ICommand';

export default class CommandContext {
    directMessage: Message;
    authorUser: User;
    command: ICommand;

    constructor(message: Message, command:ICommand, ...args:any[]) {
        this.directMessage = message;
        this.authorUser = message.author;
        this.command = command;
    }
}