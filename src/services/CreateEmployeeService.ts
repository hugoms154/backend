import { getRepository } from 'typeorm';
import Employee from '../entities/Employee';
import employeesRouter from '../routes/employees.routes';

interface IEmployeeDTO {
  name: string;
  CPF: string;
  UF: string;
  position: string;
  salary: number;
  status: string;
  created_at?: string;
}

export default class CreateEmployeeService {
  async execute({
    name,
    CPF,
    UF,
    position,
    salary,
    status,
    created_at,
  }: IEmployeeDTO): Promise<Employee> {
    const employeeRepository = getRepository(Employee);

    const upperUF = UF.toUpperCase();
    const upperStatus = status.toUpperCase();

    const exists = await employeeRepository.findOne({ where: { CPF } });

    const employeeObj = exists
      ? employeeRepository.create({
          ...exists,
          name,
          CPF,
          UF: upperUF,
          position,
          salary,
          status: upperStatus,
          created_at,
        })
      : employeeRepository.create({
          name,
          CPF,
          UF: upperUF,
          position,
          salary,
          status: upperStatus,
          created_at,
        });

    const employee = await employeeRepository.save(employeeObj);

    return employee;
  }
}
