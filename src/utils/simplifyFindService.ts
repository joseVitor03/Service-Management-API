import { BasicDataService, Itens,
  SimplifyFindServiceType, TypedData } from '../interfaces/IServiceModel';

export default function simplifyFindService(dataService: TypedData): SimplifyFindServiceType {
  const basicData : SimplifyFindServiceType = { employees: [] as any,
    itens: [] as unknown as Itens[],
    basicServiceData: {} as unknown as BasicDataService };

  dataService.dataService.forEach((data: any) => {
    if (Object.keys(basicData.basicServiceData).length === 0) {
      if (!data.service) {
        basicData.basicServiceData = { ...data.dataValues } as unknown as BasicDataService;
      } else {
        basicData.basicServiceData = { ...data.service.dataValues } as unknown as BasicDataService;
      }
    }
    if (data.itemName) {
      basicData.itens.push({ ...data.itemName.dataValues,
        qtdUnit: data.qtdUnit,
        priceUnit: data.priceUnit } as unknown as Itens);
    }
  });

  dataService.employeesOfService.forEach((data) => {
    if (data.dataValues.description === null) {
      basicData.employees.push({ ...data.dataValues, description: 'MÃO DE OBRA' });
    } else {
      basicData.employees.push({ ...data.dataValues,
        description: data.dataValues.description.toUpperCase() });
    }
  });
  return basicData;
}
