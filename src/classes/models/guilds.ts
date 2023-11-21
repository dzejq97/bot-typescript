import { DataTypes, ModelAttributes } from 'sequelize';

export const modelAttr: ModelAttributes = {
    GuildID: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
    OwnerID: {
        type: DataTypes.STRING
    },
    Roles_RootPermissions: {
        type: DataTypes.STRING,
    },
    Roles_AdminPermissions: {
        type: DataTypes.STRING,
    },
    Roles_ModeratorPermissions: {
        type: DataTypes.STRING,
    },
    JoinDate: {
        type: DataTypes.DATE,
    }
}