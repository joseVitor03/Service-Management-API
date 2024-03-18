"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCarMock = exports.mockInsert = exports.mockFindCar = exports.mockCars = void 0;
const mockCars = [{
        id: 1,
        name: 'HONDA',
        year: 2020,
        brand: 'HONDA'
    }];
exports.mockCars = mockCars;
const mockFindCar = [{
        id: 1,
        name: 'HONDA',
        year: 2020,
        brand: 'HONDA'
    },
    {
        id: 2,
        name: 'HB20',
        year: 2020,
        brand: 'HYUNDAI'
    }];
exports.mockFindCar = mockFindCar;
const mockInsert = {
    id: 2,
    name: 'HB20',
    year: 2020,
    brand: 'HYUNDAI'
};
exports.mockInsert = mockInsert;
const updateCarMock = {
    id: 2,
    name: 'HB20',
    year: 2023,
    brand: 'HYUNDAI',
};
exports.updateCarMock = updateCarMock;
