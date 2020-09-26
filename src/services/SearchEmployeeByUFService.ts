import { getRepository } from 'typeorm';
import Employee from '../entities/Employee';
import AppError from '../errors/AppError';

interface IResponse {
  employees: Employee[];
  total: number;
}
export default class SearchEmployeeByCPFService {
  async execute(UF: string): Promise<IResponse> {
    const employeeRepository = getRepository(Employee);
    const upperUF = UF.toUpperCase();

    if (!UF) throw new AppError('Value must be required.', 400);

    const employees = await employeeRepository.find({
      where: { UF: upperUF },
    });

    if (employees.length === 0)
      throw new AppError('No entries found to this value', 404);

    const total = employees.length;

    return { employees, total };
  }
}
