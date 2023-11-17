import { Sequelize, DataTypes, Model} from "sequelize";
import { Collection } from 'discord.js';
import { botClient } from "src/client";
import fs from 'node:fs';
import path from 'node:path';

export class DatabaseManager {
    client: botClient;
    databaseConnection: Sequelize;
    userCache: Collection<number, Model> = new Collection();

    constructor(client: botClient) {
        this.client = client;
        this.databaseConnection = new Sequelize({
            dialect: 'sqlite',
            storage: './database.sqlite'
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
    }

    userInit() {
        
    }

}