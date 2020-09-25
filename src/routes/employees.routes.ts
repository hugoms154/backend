import { Router } from 'express';

const employeesRouter = Router();

employeesRouter.post('/', (request, response) => {
  return response.json({ ok: true });
});

export default employeesRouter;
