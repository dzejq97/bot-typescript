import { EmbedBuilder, Colors, APIEmbed } from "discord.js";
import client from "../client";

export class EmbedsManager {
    client = client;

    infoEmbed(content: string): APIEmbed {
        const embed: APIEmbed = {
            title: content
        }

        return embed;
    }
}