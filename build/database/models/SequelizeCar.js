"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const _1 = __importDefault(require("."));
class SequelizeCar extends sequelize_1.Model {
}
SequelizeCar.init({
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
}, {
    tableName: 'cars',
    modelName: 'cars',
    timestamps: false,
    sequelize: _1.default,
});
exports.default = SequelizeCar;
