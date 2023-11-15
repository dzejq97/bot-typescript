import { Events, Message } from 'discord.js';
import { prefix } from '../config.json';
import client from '../client'

export = {
    name: Events.MessageCreate,
    once: false,
    execute(message: Message) {

        if (message.content.startsWith(prefix)) {
            client.commands.seekCommand(message);
            return;
        }
        return;
    }
}