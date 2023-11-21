import { ICommand } from "src/classes/ICommand";
import CommandContext from "src/classes/commandContext";

export const command: ICommand = {
    meta: {
        name: 'setadmin',
        aliases: ['conf'],
        description: "Give admin privilages"
    },
    execute(context: CommandContext) {
        return;
    }
}