import { Collection, Message } from 'discord.js';
import fs from 'node:fs';
import path from 'node:path';

export class commandsManager {
    commands = new Collection();
    constructor() {
        const commandsPath = path.join(__dirname, '/../commands');
        const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.ts'));
        for (const file of commandFiles) {
            const filePath = path.join(commandsPath, file);
            const command = require(filePath);
            if('meta' in command && 'execute' in command) {
                this.commands.set(command.meta.name, command);
                console.log(`${command.meta.name} command loaded!`)
            } else {
                console.error(`Warining! Command ${filePath} incorrect.`);
            }
        }
    }

    public seekCommand(message: Message) {
        console.log('Command activated')
    }
}