
module.exports = {
    meta: {
        name:'ping',
        aliases: ['pong', 'test'],
    },
    execute() {
        return console.log(arguments);
    },
};