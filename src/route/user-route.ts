import { Router } from "express";
import { UserController } from "../controller/user-controller";

export const UserRouter = Router();

UserRouter.get('/users', UserController.GETALLUSERS)
UserRouter.get('/users/:id', UserController.GETUSERBYID)
UserRouter.post('/users', UserController.CREATEUSER)
UserRouter.delete('/users/:id', UserController.DELETEUSER)
UserRouter.put('/users/:id', UserController.UPDATEUSER)