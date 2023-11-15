import { Events, Client } from 'discord.js';

export = {
    name: Events.ClientReady,
    once: true,
    execute(client: Client) {
        console.log(`Client ready. Logged in as ${client.user?.username}`);
    },
};