import { injectable, inject } from 'tsyringe';
import IEmployeeRepository from '../repositories/IEmployeeRepository';
import ICreateEmployeeDTO from './ICreateEmployeeDTO';
import Employee from '../entities/Employee';

@injectable()
export default class CreateEmployeeService {
  constructor(
    @inject('EmployeeRepository')
    private employeeRepository: IEmployeeRepository,
  ) {}

  public async execute({
    name,
    CPF,
    UF,
    position,
    salary,
    status,
    created_at,
  }: ICreateEmployeeDTO): Promise<Employee> {
    const employee = await this.employeeRepository.create({
      name,
      CPF,
      UF,
      position,
      salary,
      status,
      created_at,
    });

    return employee;
  }
}
