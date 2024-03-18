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
const CarModel_1 = __importDefault(require("../models/CarModel"));
class CarService {
    constructor(carModel = new CarModel_1.default()) {
        this.carModel = carModel;
    }
    listCars() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.carModel.listCars();
            return { status: 'SUCCESSFUL', data: result };
        });
    }
    insertCar(_a) {
        return __awaiter(this, arguments, void 0, function* ({ name, brand, year }) {
            const result = yield this.carModel.insertCar({ name: name.toUpperCase(), brand, year });
            return { status: 'CREATED', data: result };
        });
    }
    removeCar(_a) {
        return __awaiter(this, arguments, void 0, function* ({ name, brand, year }) {
            const result = yield this.carModel.removeCar({ name, year, brand });
            if (result === 0) {
                return { status: 'NOT_FOUND', data: { message: 'carro não encontrado' } };
            }
            return { status: 'SUCCESSFUL', data: { name, brand, year } };
        });
    }
    findCar(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.carModel.findCar(name);
            return { status: 'SUCCESSFUL', data: result };
        });
    }
    updateCar(_a) {
        return __awaiter(this, arguments, void 0, function* ({ id, name, brand, year }) {
            yield this.carModel.updateCar({ id, name: name.toUpperCase(), brand, year });
            return { status: 'SUCCESSFUL', data: { id, name: name.toUpperCase(), brand, year } };
        });
    }
}
exports.default = CarService;
