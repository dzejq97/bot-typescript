import { Collection, Message } from 'discord.js';
import fs from 'node:fs';
import { type } from 'node:os';
import path from 'node:path';
import { ICommand } from './ICommand';

export class commandsManager {

    commands:Collection <string, ICommand>  = new Collection();

    constructor() {
        const commandsPath = path.join(__dirname, '/../commands');
        const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.ts'));
        for (const file of commandFiles) {
            const filePath = path.join(commandsPath, file);
            const command = require(filePath).command;
            this.commands.set(command.meta.name, command);        }
    }

    public async seekCommand(message: Message) {
        //await message.delete();

        const commandArgs: string[] = message.content.substring(1).split(' ');
        const commandName = commandArgs[0];
        delete commandArgs[0];

        this.commands.forEach((value, key) => {
            if (value.meta.name === commandName) {
                value.execute(message, commandArgs);
                return;
            } else {
                value.meta.aliases.forEach(v => {
                    if (v === commandName) {
                       value.execute(message, commandArgs);
                       return; 
                    }
                })
            }

            console.log(value.meta.name);
        })
    }
}