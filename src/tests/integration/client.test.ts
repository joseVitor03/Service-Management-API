import sinon from 'sinon';
import chai from 'chai';
import jwt from 'jsonwebtoken';
import chaiHttp = require('chai-http');
import SequelizeCar from '../../database/models/SequelizeCar';
// @ts-check
import App from '../../app';
import { mockCars, mockFindCar, mockInsert, updateCarMock } from '../mocks/carMocks';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;
const bearer = 'Bearer any';
