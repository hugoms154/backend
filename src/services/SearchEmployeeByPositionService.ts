import { getRepository } from 'typeorm';
import Employee from '../entities/Employee';
import AppError from '../errors/AppError';

export default class SearchEmployeeByCPFService {
  async execute(position: string): Promise<Employee[] | Employee> {
    const employeeRepository = getRepository(Employee);
    if (!position) throw new AppError('Value must be required.', 400);

    const employee = await employeeRepository.find({
      where: `"Employee"."position" LIKE '%${position}%'`,
    });

    if (employee.length === 0) throw new AppError('Employees not found.', 404);

    return employee;
  }
}
