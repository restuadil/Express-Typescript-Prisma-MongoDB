import { prisma } from "../db/prisma";
import { UserRequest } from "../model/user-model";


export const UserService = {
  getAllUsers: async () => {
    const data = await prisma.user.findMany();
    return data;
  },
  getUserById: async (id: string) => {
    try {
      const data = await prisma.user.findUnique({
        where: {
          id: id,
        },
      });
      return data;
    } catch (error) {
      return null;
    }
  },
  createUser: async (data: UserRequest) => {
    try {
      const existingUser = await prisma.user.findFirst({
        where: {
          OR: [
            { username: data.username },
            { email: data.email },
          ],
        },
      });

      if (existingUser) {
        return { success: false, message: "Username or email already exists" };
      }
      const newUser = await prisma.user.create({
        data: { ...data },
      });
      return { success: true, newUser };
    } catch (error) {
      console.error("Error creating user:", error);
      return { success: false, message: "Failed to create user" };
    }
  }

};
