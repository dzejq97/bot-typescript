import { ICommand } from "src/classes/ICommand";
import CommandContext from "src/classes/commandContext";

export const command: ICommand = {
    meta: {
        name: 'hello',
        aliases: ['hi', 'yo'],
        description: "Say hi to someone!"
    },
    execute(context: CommandContext) {
        let user: string;

        if (context.arguments[0]) {
            user = context.arguments[0]
        } else {
            return context.directMessage.reply(`Mention user you want to greet.`)
        }

        if(context.argumentIsMention(user)) {
            context.directMessage.reply(`Hello ${user}!`);
        } else {
            context.directMessage.reply(`Mention user you want to greet.`);
        }
    }
}