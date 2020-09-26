import { getRepository } from 'typeorm';
import Employee from '../entities/Employee';
import AppError from '../errors/AppError';

import convertStringToDate from '../utils/ConvertStringToDate';
import convertDateToDbDate from '../utils/ConvertDateToDbDate';
import validateDate from '../utils/ValidateDate';

export default class SearchEmployeeByCPFService {
  async execute(date: string): Promise<Employee[]> {
    const employeeRepository = getRepository(Employee);
    const [formatedDate] = convertDateToDbDate(convertStringToDate(date)).split(
      ' ',
    );

    if (!validateDate(date)) throw new AppError('Invalid Date format');

    const employee = await employeeRepository.find({
      // where: { created_at: `${formatedDate}` },
      where: `"Employee_created_at" LIKE '${formatedDate}%'`,
      // where: `"Employee"."name" LIKE '%${name}%'`,
    });

    if (employee.length === 0) throw new AppError('Employees not found.', 404);

    return employee;
  }
}
