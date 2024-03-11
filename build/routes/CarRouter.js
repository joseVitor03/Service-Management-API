"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Car_controller_1 = __importDefault(require("../controller/Car.controller"));
const carsRouter = (0, express_1.Router)();
const carController = new Car_controller_1.default();
carsRouter.get('/cars', (req, res) => carController.listFilms(req, res));
// filmsRouter.get('/films/:id', (req: Request, res: Response) => filmController.findFilm(req, res));
exports.default = carsRouter;
