import { Between, getRepository } from 'typeorm';
import Employee from '../entities/Employee';
import AppError from '../errors/AppError';

export interface IResquest {
  min: number;
  max: number;
}

export default class SearchEmployeeByCPFService {
  async execute({ min, max }: IResquest): Promise<Employee[]> {
    const employeeRepository = getRepository(Employee);

    if (!max) throw new AppError('Max value must be required.', 400);

    // min <=salary <= max
    const employee = await employeeRepository.find({
      where: { salary: Between(min, max) },
    });

    if (employee.length === 0) throw new AppError('Employee not found.', 404);

    return employee;
  }
}
