import { Router } from 'express';

import multer from 'multer';
import { getRepository } from 'typeorm';
import uploadConfig from '../config/upload';

import {
  CreateEmployeeService,
  ImportEmployeeService,
  SearchEmployeeByCPFService,
  DeleteEmployeeService,
  SearchEmployeeByCreationDateService,
  SearchEmployeeByNameService,
  SearchEmployeeByPositionService,
  SearchEmployeeBySalaryService,
  SearchEmployeeByStatusService,
  SearchEmployeeByUFService,
} from '../services';

import Employee from '../entities/Employee';

const employeesRouter = Router();

const upload = multer(uploadConfig);

employeesRouter.post(
  '/import',
  upload.single('file'),
  async (request, response) => {
    const importEmployeeService = new ImportEmployeeService();

    const employees = await importEmployeeService.execute({
      csvFileName: request.file.filename,
    });
    return response.json({ employees });
  },
);

employeesRouter.post('/', async (request, response) => {
  const { name, CPF, position, salary, UF, status, created_at } = request.body;

  const createEmployeeService = new CreateEmployeeService();

  const employee = await createEmployeeService.execute({
    name,
    CPF,
    position,
    salary,
    UF,
    status,
    created_at,
  });

  return response.json(employee);
});

employeesRouter.delete('/:CPF', async (request, response) => {
  const { CPF } = request.params;

  const deleteEmployeeService = new DeleteEmployeeService();

  await deleteEmployeeService.execute(CPF);

  return response.status(201).send();
});

employeesRouter.get('/', async (request, response) => {
  const employeeRepository = getRepository(Employee);
  const employees = await employeeRepository.find();
  return response.json(employees);
});

employeesRouter.get('/name', async (request, response) => {
  const { value } = request.query;
  const searchEmployeeByNameService = new SearchEmployeeByNameService();

  const employees = await searchEmployeeByNameService.execute(value as string);

  return response.json(employees);
});

employeesRouter.get('/position', async (request, response) => {
  const { value } = request.query;
  const searchEmployeeByPositionService = new SearchEmployeeByPositionService();

  const employees = await searchEmployeeByPositionService.execute(
    value as string,
  );

  return response.json(employees);
});

employeesRouter.get('/uf', async (request, response) => {
  const { value } = request.query;
  const searchEmployeeByUFService = new SearchEmployeeByUFService();

  const { employees, total } = await searchEmployeeByUFService.execute(
    value as string,
  );

  return response.json({ employees, total });
});

employeesRouter.get('/status', async (request, response) => {
  const { value } = request.query;
  const searchEmployeeByStatusService = new SearchEmployeeByStatusService();

  const employees = await searchEmployeeByStatusService.execute(
    value as string,
  );

  return response.json(employees);
});

employeesRouter.get('/cpf', async (request, response) => {
  const { value } = request.query;
  const searchEmployeeByCPFService = new SearchEmployeeByCPFService();

  const employee = await searchEmployeeByCPFService.execute(value as string);

  return response.json(employee);
});

employeesRouter.get('/date', async (request, response) => {
  const { value } = request.query;
  const searchEmployeeByCreationDateService = new SearchEmployeeByCreationDateService();

  const employees = await searchEmployeeByCreationDateService.execute(
    value as string,
  );

  return response.json(employees);
});

employeesRouter.get('/salary', async (request, response) => {
  const { min = 0, max } = request.query;
  const minToNumber = Number(min);
  const maxToNumber = Number(max);

  const searchEmployeeBySalaryService = new SearchEmployeeBySalaryService();

  const employees = await searchEmployeeBySalaryService.execute({
    min: minToNumber,
    max: maxToNumber,
  });

  return response.json(employees);
});

export default employeesRouter;
