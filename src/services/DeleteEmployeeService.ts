import { getRepository } from 'typeorm';
import Employee from '../entities/Employee';
import employeesRouter from '../routes/employees.routes';

export default class DeleteEmployeeService {
  async execute(CPF: string) {
    const employeeRepository = getRepository(Employee);
    await employeeRepository.delete({ CPF });
  }
}
