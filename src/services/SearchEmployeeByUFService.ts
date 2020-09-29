import { injectable, inject } from 'tsyringe';
import Employee from '../entities/Employee';
import AppError from '../errors/AppError';
import IEmployeeRepository from '../repositories/IEmployeeRepository';

interface IResponse {
  employees: Employee[];
  total: number;
}
@injectable()
export default class SearchEmployeeByCPFService {
  constructor(
    @inject('EmployeeRepository')
    private employeeRepository: IEmployeeRepository,
  ) {}

  async execute(UF: string): Promise<IResponse> {
    const upperUF = UF.toUpperCase();

    if (!UF) throw new AppError('Value must be required.', 400);

    const employees = await this.employeeRepository.findByUF(upperUF);

    if (!employees) throw new AppError('No entries found to this value', 404);

    const total = employees.length;

    return { employees, total };
  }
}
