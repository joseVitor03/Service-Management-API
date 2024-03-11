"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
exports.default = {
    up(queryInterface) {
        return queryInterface.createTable('cars', {
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            year: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
            },
            brand: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
        });
    },
    down(queryInterface) {
        return queryInterface.dropTable('cars');
    },
};
