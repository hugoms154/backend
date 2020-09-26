import { Router } from 'express';

import multer from 'multer';
import uploadConfig from '../config/upload';

import ImportEmployeeService from '../services/ImportEmployeeService';

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

employeesRouter.get('/', (request, response) => {
  console.log(request);
  // if(param === 'name')
  //   const emplyee = searchEmployeeByNameService(param);
  // else if (param === 'UF')
  //   const emplyee = searchEmployeeByUFService(param);

  // const emplyee = searchEmployeeBySOMETHINGService(param);
  return response.json({ ok: true });
});

export default employeesRouter;
