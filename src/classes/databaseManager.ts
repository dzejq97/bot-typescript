import { Sequelize, DataTypes, Model} from "sequelize";
import { Collection, User, Guild, ClientUser } from 'discord.js';
import { botClient } from "src/client";
import fs, { Mode } from 'node:fs';
import path from 'node:path';
import { type } from "node:os";

export class DatabaseManager {
    client: botClient;
    databaseConnection: Sequelize;
    tables: any;
    usersCache: Collection<string, Model> = new Collection();
    guildsCache: Collection<string, Model> = new Collection();

    constructor(client: botClient) {
        this.client = client;
        this.databaseConnection = new Sequelize({
            dialect: 'sqlite',
            storage: './database.sqlite',
            logging: true, //Debug console logging
        })

        try {
            this.databaseConnection.authenticate();
            console.log('database connected');
        } catch (error) {
            console.log(error);
        }

        // Load models
        const modelsDir = path.join(__dirname, 'models');
        const modelFiles = fs.readdirSync(modelsDir).filter(file => file.endsWith('.ts'));
        for (const file of modelFiles) {
            const fileDir = path.join(modelsDir, file);
            const model = require(fileDir);
            this.databaseConnection.define(file.substring(0, file.length - 3), model);
            console.log(`Database model ${file} loaded!`)
        }
        this.tables = this.databaseConnection.models;
        this.syncDatabase();
    }
    
    async syncDatabase(){
        await this.databaseConnection.sync();
    }
    
    async syncUsersAndGuilds() {
        const fetchedGuilds = await this.client.guilds.fetch();

        fetchedGuilds.forEach(async (OAGuild, id) => {
            const guild = this.client.guilds.cache.get(id);
            if (!await this.isGuildInDatabase(guild)) await this.addGuild(guild);

            const members = await guild?.members.fetch();
            members?.forEach(async (member, id) => {
                if (!await this.isUserInDatabase(member.user)) this.addUser(member.user);
            })
        })
    }

    async isUserInDatabase(user: User | null) {
        const model = this.databaseConnection.models['users'];
        if(!user) return false;
        
        try {
            if (await model.findOne({
                where: {
                    UserID: user.id,
                }
            })) return true;
            return false; 
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async isGuildInDatabase(guild: Guild|undefined) {
        const model = this.databaseConnection.models['guilds'];
        if (!guild) return false;

        try {
            if (await model.findOne({
                where: {
                    GuildID: guild.id,
                }
            })) return true;
            return false;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async addGuild(guild: Guild|undefined) {
        if (!guild) return console.error('failed to create database entry');

        const model = this.databaseConnection.models['guilds'];
        const guildInstance = await model.create({
            GuildID: guild.id,
            JoinDate: new Date().toISOString(),
        })

        if (!this.guildsCache.get(guild.id)) this.guildsCache.set(guild.id, guildInstance);
    }

    async addUser(user: User | null) {
        if(!user) return console.error('Failed to create database entry');

        const model = this.databaseConnection.models['users'];
        const userInstance = await model.create({
            UserID: user.id,
            JoinDate: new Date().toISOString(),
        })
        
        if(!this.usersCache.get(user.id)) this.usersCache.set(user.id, userInstance);
    }

}