import { Router, Request, Response } from 'express'
import { EmployeeSchema, EmployeeResponseSchema, EmployeeInput } from '../schemas/EmployeeSchema'
import { DeletedResponseSchema } from '../schemas/BaseSchema'

const employeeRouter = Router()

// simulate database
const employeesDB: EmployeeInput[] = [];

// createEmployee(employeeData: EmployeeType)
employeeRouter.post('/api/v1/employee', (req: Request, res: Response) => {
  const employee: EmployeeInput = req.body;

  const isValidEmployeeInput = EmployeeSchema.parse({ ...employee });

  const date = new Date();

  const isValidEmployee = EmployeeResponseSchema.parse({
    ...isValidEmployeeInput,
    id: Math.floor(Math.random() * 6) + 1,
    created_at: date.toJSON(),
    is_active: true,
  });

  employeesDB.push(isValidEmployee);
  res.status(201).json(isValidEmployee);
});

employeeRouter.get('/api/v1/employee', (req: Request, res: Response) => {
  res.status(200).json(employeesDB);
});

employeeRouter.get('/employee/:id', (req: Request, res: Response) => {
    const id: number = Number(req.params.id)
    const employee = employeesDB.filter((u) => u.id == id)
    res.status(200).json(employee)
})

employeeRouter.delete('/api/v1/employee/:id', (req: Request, res: Response) => {
  const id: number = Number(req.params.id);
  const employee = employeesDB.filter((u) => u.id == id);

  const date = new Date();

  const deletedEmployee = DeletedResponseSchema.parse({
    id: employee[0].id,
    deleted_at: date.toJSON(),
    is_active: false,
  });

  res.status(204).json(deletedEmployee);
});

export default employeeRouter
