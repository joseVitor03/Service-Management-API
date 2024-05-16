import { EmployeeProductivityType, TypedEmployeeProductivity } from '../interfaces/IEmployeeModel';

export default function simplifyProductivityByDate(data: TypedEmployeeProductivity[]) {
  const resultFinal = [] as unknown as EmployeeProductivityType[];
  data.forEach((dataService) => {
    resultFinal.push({ labor: dataService.dataValues.labor,
      description: dataService.dataValues.description == null
        ? 'MÃO DE OBRA' : dataService.dataValues.description,
      service: { id: dataService.dataValues.service.dataValues.id,
        date: dataService.dataValues.service.dataValues.date,
        client: { id: dataService.dataValues.service.dataValues.client.dataValues.id,
          name: dataService.dataValues.service.dataValues.client.dataValues.name,
          carColor: dataService.dataValues.service.dataValues.client.dataValues.carColor,
          plate: dataService.dataValues.service.dataValues.client.dataValues.plate,
          car: { ...dataService.dataValues.service.dataValues.client.dataValues.car.dataValues },
        } },
      employee: { ...dataService.employee.dataValues } });
  });
  return resultFinal;
}
