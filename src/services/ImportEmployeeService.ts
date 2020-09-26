import { getRepository } from 'typeorm';
import csvParse from 'csv-parse';
import path from 'path';
import fs from 'fs';
import uploadConfig from '../config/upload';

import convertStringToDate from '../utils/ConvertStringToDate';

import Employee from '../entities/Employee';
import AppError from '../errors/AppError';

interface Request {
  csvFileName: string;
}

interface EmployeeTxt {
  // id: number;
  created_at: Date;
  position: string;
  CPF: string;
  name: string;
  UF: string;
  salary: number;
  status: string;
}

class ImportEmployeeServive {
  async execute({ csvFileName }: Request): Promise<Omit<Employee, 'id'>[]> {
    console.log(csvFileName);
    const employeeRepository = getRepository(Employee);
    const employees: EmployeeTxt[] = [];

    const csvFile = path.join(uploadConfig.directory, csvFileName);

    const stream = fs.createReadStream(csvFile);
    const parser = csvParse({
      from_line: 2,
      ltrim: true,
      rtrim: true,
      skipEmptyLines: true,
      delimiter: ';',
    });
    const csv = stream.pipe(parser);

    // aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
    console.log(
      await employeeRepository.createQueryBuilder('employees').getCount(),
    );

    csv.on('data', line => {
      const [created_at, position, CPF, name, UF, salary, status] = line;

      if (!position || !CPF || !name || !UF || !salary || !status)
        throw new AppError('All fields must be filled');
      employees.push({
        created_at: convertStringToDate(created_at),
        position,
        CPF,
        name,
        UF,
        salary,
        status,
      });
    });

    await new Promise(resolve => csv.on('end', resolve));

    await employeeRepository.save(employees);

    await fs.promises.unlink(csvFile);

    return employees;
  }
}

export default ImportEmployeeServive;
