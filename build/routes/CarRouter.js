"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Car_controller_1 = __importDefault(require("../controller/Car.controller"));
const Validates_1 = __importDefault(require("../middlewares/Validates"));
const carsRouter = (0, express_1.Router)();
const carController = new Car_controller_1.default();
carsRouter.get('/cars', (req, res) => carController.listCars(req, res));
carsRouter.get('/cars/findCars', (req, res) => carController.findCar(req, res));
carsRouter.post('/cars', Validates_1.default.validateCar, (req, res) => carController.insertCar(req, res));
carsRouter.patch('/cars', Validates_1.default.validateCar, (req, res) => carController.updateCar(req, res));
carsRouter.delete('/cars', Validates_1.default.validateCar, (req, res) => carController.removeCar(req, res));
exports.default = carsRouter;
