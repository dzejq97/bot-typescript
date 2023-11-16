import { ICommand } from "src/classes/ICommand";
import CommandContext from "src/classes/commandContext";

export const command: ICommand = {
    meta: {
        name: 'hello',
        aliases: ['hi', 'yo'],
        description: "Say hi to someone!"
    },
    execute(context: CommandContext) {
        console.log(context.arguments);
    }
}