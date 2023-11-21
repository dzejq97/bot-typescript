import { DataTypes, ModelAttributes } from 'sequelize';

export const modelAttr: ModelAttributes = {
    UserID: {
        type: DataTypes.STRING,
    },
    JoinDate: {
        type: DataTypes.DATE,
    },
    Reputation: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    }
}