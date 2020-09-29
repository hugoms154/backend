import Employee from '../entities/Employee';
import ICreateEmployeeDTO from '../services/ICreateEmployeeDTO';

export default interface IEmployeeRepository {
  create(employee: ICreateEmployeeDTO): Promise<Employee>;
  save(employee: Employee): Promise<Employee>;
  remove(CPF: string): Promise<Employee | Employee[]>;
  findAll(): Promise<Employee[] | undefined>;
  findByCPF(CPF: string): Promise<Employee | undefined>;
  findByName(name: string): Promise<Employee[] | undefined>;
  findByCreatedAt(date: string): Promise<Employee[] | undefined>;
  findByPosition(position: string): Promise<Employee[] | undefined>;
  findBySalaryRange(min: number, max: number): Promise<Employee[] | undefined>;
  findByStatus(status: string): Promise<Employee[] | undefined>;
  findByUF(UF: string): Promise<Employee[] | undefined>;
}
