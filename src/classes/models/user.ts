import { DataTypes } from 'sequelize';

export = {
    UserID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
    JoinDate: {
        type: DataTypes.DATE,
    }
}