import { Sequelize, Model} from "sequelize";
import { Collection, User, Guild } from 'discord.js';
import { botClient } from "src/client";
import fs from 'node:fs';
import path from 'node:path';

export class DatabaseManager {
    client: botClient;
    sequelize: Sequelize;
    tables: any;
    usersCache: Collection<string, Model> = new Collection();
    guildsCache: Collection<string, Model> = new Collection();

    constructor(client: botClient) {
        this.client = client;
        this.sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: './database.sqlite',
            logging: true, //Debug console logging
        })

        try {
            this.sequelize.authenticate();
            console.log('database connected');
        } catch (error) {
            console.log(error);
        }

        // Load models
        const modelsDir = path.join(__dirname, 'models');
        const modelFiles = fs.readdirSync(modelsDir).filter(file => file.endsWith('.ts'));
        for (const file of modelFiles) {
            const fileDir = path.join(modelsDir, file);
            const model = require(fileDir).modelAttr;
            this.sequelize.define(file.substring(0, file.length - 3), model);
            console.log(`Database model ${file} loaded!`)
        }
        this.tables = this.sequelize.models;
        this.syncDatabase();
    }
    
    async syncDatabase(){
        await this.sequelize.sync();
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
        if(!user) return false;
        const model = this.sequelize.models['users'];

        // check if user is in local cache
        if (this.usersCache.find((m, id) => id === user.id)) return true;
        // then seek in database
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
        if (!guild) return false;
        const model = this.sequelize.models['guilds'];

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

        const model = this.sequelize.models['guilds'];
        const guildInstance = await model.create({
            GuildID: guild.id,
            JoinDate: new Date().toISOString(),
            OwnerID: guild.ownerId,
        })

        if (!this.guildsCache.get(guild.id)) this.guildsCache.set(guild.id, guildInstance);
    }

    async addUser(user: User | null) {
        if(!user) return console.error('Failed to create database entry');

        const model = this.sequelize.models['users'];
        const userInstance = await model.create({
            UserID: user.id,
            JoinDate: new Date().toISOString(),
        })
        
        if(!this.usersCache.get(user.id)) this.usersCache.set(user.id, userInstance);
    }

}