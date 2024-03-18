"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const SequelizeCar_1 = __importDefault(require("../database/models/SequelizeCar"));
class CarModel {
    constructor() {
        this.model = SequelizeCar_1.default;
    }
    listCars() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.model.findAll();
            return result;
        });
    }
    insertCar(_a) {
        return __awaiter(this, arguments, void 0, function* ({ name, brand, year }) {
            const [result] = yield this.model.findOrCreate({ where: { name, brand, year } });
            return result;
        });
    }
    removeCar(_a) {
        return __awaiter(this, arguments, void 0, function* ({ name, brand, year }) {
            const result = yield this.model.destroy({ where: { name, brand, year } });
            return result;
        });
    }
    findCar(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.model.findAll({ where: {
                    name: { [sequelize_1.Op.like]: `%${name.toUpperCase()}%` },
                } });
            return result;
        });
    }
    updateCar(_a) {
        return __awaiter(this, arguments, void 0, function* ({ id, name, brand, year }) {
            const [result] = yield this.model.update({ name, brand, year }, { where: { id } });
            return result;
        });
    }
}
exports.default = CarModel;
