import { getRepository } from 'typeorm';
import Employee from '../entities/Employee';
import AppError from '../errors/AppError';

export default class SearchEmployeeByCPFService {
  async execute(CPF: string): Promise<Employee> {
    const employeeRepository = getRepository(Employee);

    if (!CPF) throw new AppError('Value must be required.', 400);

    const employee = await employeeRepository.findOne({ where: { CPF } });

    if (!employee) throw new AppError('Employee not found.', 404);

    return employee;
  }
}
