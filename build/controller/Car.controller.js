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
class CarController {
    constructor(filmService = new Car_service_1.default()) {
        this.filmService = filmService;
    }
    listFilms(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { status, data } = yield this.filmService.listCars();
            return res.status(status).json(data);
        });
    }
}
exports.default = CarController;
