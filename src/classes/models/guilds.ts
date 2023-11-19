import { DataTypes } from 'sequelize';

export = {
    GuildID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
    JoinDate: {
        type: DataTypes.DATE,
    }
}