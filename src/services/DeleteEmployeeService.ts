import { injectable, inject } from 'tsyringe';
import Employee from '../entities/Employee';
import IEmployeeRepository from '../repositories/IEmployeeRepository';

@injectable()
export default class DeleteEmployeeService {
  constructor(
    @inject('EmployeeRepository')
    private employeeRepository: IEmployeeRepository,
  ) {}

  public async execute(CPF: string): Promise<Employee | Employee[]> {
    const result = await this.employeeRepository.remove(CPF);
    return result;
  }
}
