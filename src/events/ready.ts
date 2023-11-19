import { Events, Client } from 'discord.js';
import { botClient } from 'src/client';

export = {
    name: Events.ClientReady,
    once: true,
    async execute(client: botClient) {

        await client.database.syncUsersAndGuilds();

        
        console.log(`Client ready. Logged in as ${client.user?.username}`);

        //if (!await client.database.isUserInDatabase(client.user))
          //  await client.database.addUser(client.user)
    },
};