import { Client, GatewayIntentBits, Collection } from 'discord.js';
import { CommandsManager } from './classes/commandsManager';
import { DatabaseManager } from './classes/databaseManager';
import { EmbedsManager } from './classes/embedsManager';
import { prefix } from './config.json'

export class botClient extends Client {
    prefix = prefix
    commands = new CommandsManager(this);
    database = new DatabaseManager(this);
    embeds = new EmbedsManager();
}

const client = new botClient({
    intents: [
        GatewayIntentBits.AutoModerationConfiguration,
        GatewayIntentBits.AutoModerationExecution,
        GatewayIntentBits.DirectMessageReactions,
        GatewayIntentBits.DirectMessageTyping,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.GuildEmojisAndStickers,
        GatewayIntentBits.GuildIntegrations,
        GatewayIntentBits.GuildInvites,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMessageTyping,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildModeration,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildScheduledEvents,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildWebhooks,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.MessageContent ],
});

export default client;