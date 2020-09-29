import { injectable, inject } from 'tsyringe';
import Employee from '../entities/Employee';
import AppError from '../errors/AppError';
import IEmployeeRepository from '../repositories/IEmployeeRepository';

export interface IResquest {
  min: number;
  max: number;
}

@injectable()
export default class SearchEmployeeByCPFService {
  constructor(
    @inject('EmployeeRepository')
    private employeeRepository: IEmployeeRepository,
  ) {}

  async execute({ min, max }: IResquest): Promise<Employee[]> {
    if (!max) throw new AppError('Max value must be required.', 400);

    const employee = await this.employeeRepository.findBySalaryRange(min, max);

    if (!employee) throw new AppError('Employee not found.', 404);

    return employee;
  }
}
