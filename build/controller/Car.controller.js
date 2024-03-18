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
const Car_service_1 = __importDefault(require("../services/Car.service"));
const mapStatusHTTP_1 = __importDefault(require("../utils/mapStatusHTTP"));
class CarController {
    constructor(carService = new Car_service_1.default()) {
        this.carService = carService;
    }
    listCars(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { status, data } = yield this.carService.listCars();
            return res.status((0, mapStatusHTTP_1.default)(status)).json(data);
        });
    }
    insertCar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, brand, year } = req.body;
            const { status, data } = yield this.carService.insertCar({ name, year, brand });
            return res.status((0, mapStatusHTTP_1.default)(status)).json(data);
        });
    }
    removeCar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, brand, year } = req.body;
            const { status, data } = yield this.carService.removeCar({ name, year, brand });
            return res.status((0, mapStatusHTTP_1.default)(status)).json(data);
        });
    }
    findCar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name } = req.query;
            if (typeof name === 'string') {
                const { status, data } = yield this.carService.findCar(name);
                return res.status((0, mapStatusHTTP_1.default)(status)).json(data);
            }
            return res.status(400).json({ message: 'Bad Request' });
        });
    }
    updateCar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, name, brand, year } = req.body;
            const { status, data } = yield this.carService.updateCar({ id, name, brand, year });
            return res.status((0, mapStatusHTTP_1.default)(status)).json(data);
        });
    }
}
exports.default = CarController;
