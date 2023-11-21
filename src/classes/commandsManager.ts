import { Collection, Message } from 'discord.js';
import fs from 'node:fs';
import path from 'node:path';
import { ICommand } from './ICommand';
import CommandContext from './commandContext';
import { botClient } from 'src/client';

export class CommandsManager {

    client: botClient;
    commands:Collection <string, ICommand>  = new Collection();

    constructor(client: botClient) {
        this.client = client;

        const categoriesPath = path.join(__dirname, '/../commands');
        const categoriesFolders = fs.readdirSync(categoriesPath).filter(file => !file.endsWith('.txt'));
        console.log(categoriesFolders)
        for (const category of categoriesFolders) {
            const commandsPath = path.join(categoriesPath, category);
            const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.ts'));
            for (const file of commandFiles) {
                const filePath = path.join(commandsPath, file);
                const command:ICommand = require(filePath).command;
                command.meta.category = category;
                this.commands.set(command.meta.name, command);
            }
        }
    }

    public async seekCommand(message: Message) {
        //await message.delete();

        let commandArgs: string[] = message.content.substring(1).split(' ');
        let commandName = commandArgs.shift()?.toLowerCase()

        this.commands.forEach((command, key) => {
            if (command.meta.name === commandName) {
                const context = new CommandContext(message, command, commandArgs);
                command.execute(context);
                return;
            } else {
                command.meta.aliases.forEach(v => {
                    if (v === commandName) {
                        const context = new CommandContext(message, command, commandArgs, commandName);
                        command.execute(context);
                        return; 
                    }
                })
            }

        })
    }
}