import { injectable, inject } from 'tsyringe';
import Employee from '../entities/Employee';
import AppError from '../errors/AppError';

import convertStringToDate from '../utils/ConvertStringToDate';
import convertDateToDbDate from '../utils/ConvertDateToDbDate';
import validateDate from '../utils/ValidateDate';
import IEmployeeRepository from '../repositories/IEmployeeRepository';

@injectable()
export default class SearchEmployeeByCPFService {
  constructor(
    @inject('EmployeeRepository')
    private employeeRepository: IEmployeeRepository,
  ) {}

  async execute(date: string): Promise<Employee[]> {
    const [formatedDate] = convertDateToDbDate(convertStringToDate(date)).split(
      ' ',
    );

    if (!validateDate(date)) throw new AppError('Invalid Date format');

    const employee = await this.employeeRepository.findByCreatedAt(
      formatedDate,
    );

    if (!employee) throw new AppError('Employees not found.', 404);

    return employee;
  }
}
