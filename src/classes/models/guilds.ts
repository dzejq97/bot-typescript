import { DataTypes, ModelAttributes } from 'sequelize';

export const modelAttr: ModelAttributes = {
    GuildID: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
    OwnersID: {
        type: DataTypes.STRING
    },
    JoinDate: {
        type: DataTypes.DATE,
    }
}