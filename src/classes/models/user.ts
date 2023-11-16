import { DataTypes } from 'sequelize';

export = {
    UserID: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    JoinDate: {
        type: DataTypes.DATE,
    }
}