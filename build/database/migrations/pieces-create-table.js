"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
exports.default = {
    up(queryInterface) {
        return queryInterface.createTable('pieces', {
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            name: {
                allowNull: false,
                type: sequelize_1.DataTypes.STRING,
            },
        });
    },
    down(queryInterface) {
        return queryInterface.dropTable('pieces');
    },
};
