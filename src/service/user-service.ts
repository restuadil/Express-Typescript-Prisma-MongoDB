import { prisma } from "../db/prisma";


export const UserService = {
  getAllUsers: async () => {
    const data = await prisma.user.findMany();
    return data;
  },
  getUserById: async (id: string) => {
    const data = await prisma.user.findUnique({
      where: {
        id: id,
      },
    })
    return data;
  }
};
