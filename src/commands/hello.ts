import { ICommand } from "src/classes/ICommand";
import CommandContext from "src/classes/commandContext";

export const command: ICommand = {
    meta: {
        name: 'hello',
        aliases: ['hi', 'yo'],
        description: "Say hi to someone!"
    },
    execute(context: CommandContext) {
        //if (context.arguments.length == 0) return context.directMessage.reply('Mention user you want to greet');
        console.log(context.arguments);
        const user = context.arguments[0]

        if(context.argumentIsMention(user)) {
            context.directMessage.reply(`Hello ${user}!`);
            console.log('true');
        } else {
            context.directMessage.reply(`Mention user you want to greet.`);
            console.log('false');
        }
    }
}