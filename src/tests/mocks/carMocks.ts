const mockCars = [{
  id: 1,
  name: 'HONDA',
  year: 2020,
  brand: 'HONDA' }];

const mockFindCar = [{
  id: 1,
  name: 'HONDA',
  year: 2020,
  brand: 'HONDA' },
{
  id: 2,
  name: 'HB20',
  year: 2020,
  brand: 'HYUNDAI' }];

const mockInsert = {
  id: 2,
  name: 'HB20',
  year: 2020,
  brand: 'HYUNDAI' };

const updateCarMock = {
  id: 2,
  name: 'HB20',
  year: 2023,
  brand: 'HYUNDAI',
};

const findCarByBrandMock = [{
  name: 'VOLKSWAGEN GOL',
  year: 2024,
  brand: 'VOLKSWAGEN',
},
{
  name: 'VOLKSWAGEN POLO',
  year: 2024,
  brand: 'VOLKSWAGEN',
},
{
  name: 'VOLKSWAGEN GOLF',
  year: 2024,
  brand: 'VOLKSWAGEN',
},
{
  name: 'VOLKSWAGEN JETTA',
  year: 2024,
  brand: 'VOLKSWAGEN',
}];

export { mockCars, mockFindCar, mockInsert, updateCarMock, findCarByBrandMock };
