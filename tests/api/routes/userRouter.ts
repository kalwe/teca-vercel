import { Router, Request, Response } from 'express';
import { UserSchema, UserResponseSchema, UserInput } from '../schemas/UserSchema';
import { DeletedResponseSchema } from '../schemas/BaseSchema';

const userRouter = Router();

// simulate database
const usersDB: UserInput[] = [];

// createUser(userData: UserType)
userRouter.post('/api/v1/user', (req: Request, res: Response) => {
  const user: UserInput = req.body;

  const isValidUserInput = UserSchema.parse({ ...user });

  const date = new Date();

  const isValidUser = UserResponseSchema.parse({
    ...isValidUserInput,
    id: Math.floor(Math.random() * 6) + 1,
    created_at: date.toJSON(),
    is_active: true,
  });

  usersDB.push(isValidUser);
  res.status(201).json(isValidUser);
});

// getAllUsers()
userRouter.get('/api/v1/user', async (req: Request, res: Response) => {
  res.status(200).json(usersDB);
});

// getById(id: number)
userRouter.get('/api/v1/user/:id', async (req: Request, res: Response) => {
  const id: number = Number(req.params.id);
  const user = usersDB.filter((u) => u.id == id);
  res.status(200).json(user);
});

// updateUserById(id: number, userData: UserUpdate)
userRoutes.put('/api/v1/user/:id', async (req: Request, res: Response) => {
  const userData = req.body;
  const id: number = Number(req.params.id);

  const userExists = usersDB.filter((u) => u.id == id);

  const date = new Date();
  const isValidUser = UserResponseSchema.parse({
    ...userData,
    created_at: userExists[0].created_at,
    updated_at: date.toJSON(),
  });

  if (userExists) {
    const usersDBTemp = [...usersDB];
    usersDB = usersDBTemp.map((u) => (u.id === id ? { ...u, ...isValidUser } : u));
  }
  res.status(200).json(isValidUser);
});

// deleteById(id: number)
userRouter.delete('/api/v1/user/:id', async (req: Request, res: Response) => {
  const id: number = Number(req.params.id);
  const user = usersDB.filter((u) => u.id == id);

  usersDB.splice(
    usersDB.findIndex((u) => u.id == id),
    1,
  );

  const date = new Date();

  const deletedUser = DeletedResponseSchema.parse({
    id: user[0].id,
    deleted_at: date.toJSON(),
    is_active: false,
  });

  res.status(204).json(deletedUser);
});

export default userRouter;
