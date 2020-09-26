import { getRepository } from 'typeorm';
import Employee from '../entities/Employee';
import AppError from '../errors/AppError';

export default class SearchEmployeeByStatusService {
  async execute(status: string): Promise<Employee[]> {
    const employeeRepository = getRepository(Employee);

    const upperStatus = status.toUpperCase();

    if (!status) throw new AppError('Value must be required.', 400);

    const employee = await employeeRepository.find({
      where: { status: upperStatus },
    });

    if (employee.length === 0) throw new AppError('Employee not found.', 404);

    return employee;
  }
}
