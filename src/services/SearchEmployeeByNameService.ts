import { getRepository } from 'typeorm';
import Employee from '../entities/Employee';
import AppError from '../errors/AppError';
import employeesRouter from '../routes/employees.routes';

export default class SearchEmployeeByCPFService {
  async execute(name: string): Promise<Employee[] | Employee> {
    const employeeRepository = getRepository(Employee);
    if (!name) throw new AppError('Value must be required.', 400);

    const employee = await employeeRepository.find({
      where: `"Employee"."name" LIKE '%${name}%'`,
    });

    if (employee.length === 0) throw new AppError('Employee not found.', 404);

    return employee;
  }
}
