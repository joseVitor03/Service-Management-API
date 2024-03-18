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
const sinon_1 = __importDefault(require("sinon"));
const chai_1 = __importDefault(require("chai"));
const chaiHttp = require("chai-http");
const SequelizeCar_1 = __importDefault(require("../../database/models/SequelizeCar"));
// @ts-check
const app_1 = __importDefault(require("../../app"));
const carMocks_1 = require("../mocks/carMocks");
chai_1.default.use(chaiHttp);
const { app } = new app_1.default();
const { expect } = chai_1.default;
describe('Cars Test', function () {
    afterEach(function () {
        sinon_1.default.restore();
    });
    it('listando carros', function () {
        return __awaiter(this, void 0, void 0, function* () {
            sinon_1.default.stub(SequelizeCar_1.default, 'findAll').resolves(carMocks_1.mockCars);
            const { status, body } = yield chai_1.default.request(app).get('/cars');
            expect(status).to.equal(200);
            expect(body).to.deep.equal(carMocks_1.mockCars);
        });
    });
    it('encontrando carros usando query', function () {
        return __awaiter(this, void 0, void 0, function* () {
            sinon_1.default.stub(SequelizeCar_1.default, 'findAll').resolves(carMocks_1.mockFindCar);
            const { status, body } = yield chai_1.default.request(app).get('/cars/findCars?name=c');
            expect(status).to.be.equal(200);
            expect(body).to.eqls(carMocks_1.mockFindCar);
        });
    });
    it('inserindo carro', function () {
        return __awaiter(this, void 0, void 0, function* () {
            sinon_1.default.stub(SequelizeCar_1.default, 'findOrCreate').resolves([carMocks_1.mockInsert, 1]);
            const { status, body } = yield chai_1.default.request(app).post('/cars').send({
                name: 'HB20',
                brand: 'HYUNDAI',
                year: 2020,
            });
            expect(status).to.be.equal(201);
            expect(body).to.be.deep.equal(carMocks_1.mockInsert);
        });
    });
    it('testando remover carro', function () {
        return __awaiter(this, void 0, void 0, function* () {
            sinon_1.default.stub(SequelizeCar_1.default, 'destroy').resolves(1);
            const { status, body } = yield chai_1.default.request(app).delete('/cars').send({ name: 'HB20',
                year: 2020,
                brand: 'HYUNDAI' });
            expect(status).to.be.equal(200);
            expect(body).to.be.deep.equal({ name: 'HB20',
                year: 2020,
                brand: 'HYUNDAI' });
        });
    });
    it('testando remover carro inexistente', function () {
        return __awaiter(this, void 0, void 0, function* () {
            sinon_1.default.stub(SequelizeCar_1.default, 'destroy').resolves(0);
            const { status, body } = yield chai_1.default.request(app).delete('/cars').send({ name: 'HB20',
                year: 2020,
                brand: 'HYUNDAI' });
            expect(status).to.be.equal(404);
            expect(body).to.be.deep.equal({ message: 'carro não encontrado' });
        });
    });
    it('atualizando dados do carro', function () {
        return __awaiter(this, void 0, void 0, function* () {
            sinon_1.default.stub(SequelizeCar_1.default, 'update').resolves([1]);
            const { status, body } = yield chai_1.default.request(app).patch('/cars').send(carMocks_1.updateCarMock);
            expect(status).to.be.equal(200);
            expect(body).to.be.deep.equal(carMocks_1.updateCarMock);
        });
    });
});
