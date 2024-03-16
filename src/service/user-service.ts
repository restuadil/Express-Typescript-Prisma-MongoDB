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
  deleteUser: async (id: string) => {
    try {
      const user = await prisma.user.delete({
        where: { id: id },
      });
      return user;
    } catch (error) {
      return null;
    }
  },
  updateUser: async (id: string, data: UserRequest) => {
    try {
      const existingUser = await prisma.user.findFirst({
        where: {
          OR: [
            { username: data.username },
            { email: data.email },
          ],
        },
      });

      if (existingUser && existingUser.id !== id) {
        return null;
      }

      const userFromDB = await prisma.user.findUnique({
        where: {
          id: id,
        },
      });

      if (!userFromDB) {
        return null;
      }

      const updatedUser = await prisma.user.update({
        where: { id: id },
        data: {
          username: data.username || userFromDB.username,
          email: data.email || userFromDB.email,
          password: data.password || userFromDB.password,
          first_name: data.first_name || userFromDB.first_name,
          last_name: data.last_name || userFromDB.last_name,
        },
      });

      return updatedUser;
    } catch (error) {
      console.error("Error updating user:", error);
      return null;
    }
  }

};
