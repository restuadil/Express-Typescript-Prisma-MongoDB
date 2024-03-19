import { Prisma, Role } from "@prisma/client";
import { prisma } from "../db/prisma";
import { UserQuery, UserRequest, UserResponse } from "../model/user-model";
import { logger } from "../utils/logger";
import { pageAble, pagination } from "../model/pagination";


export const UserService = {
  getAllUsers: async (query: UserQuery): Promise<pageAble<UserResponse>> => {
    const { email, first_name, last_name, username, role, page = 1, limit = 20 } = query;
    try {
      const filters: Prisma.UserWhereInput[] = [];
      if (email) filters.push({ email: { contains: email, mode: "insensitive" } });
      if (first_name) filters.push({ first_name: { contains: first_name, mode: "insensitive" } });
      if (last_name) filters.push({ last_name: { contains: last_name, mode: "insensitive" } });
      if (username) filters.push({ username: { contains: username, mode: "insensitive" } });
      if (role) filters.push({ role: { equals: role as Role } });
      // !!NEED TO FIXS
      // if (address) {
      //   const addressFilters: Prisma.AddressWhereInput[] = [];
      //   if (address.province) addressFilters.push({ province: { contains: address.province, mode: 'insensitive' } });
      //   if (address.city) addressFilters.push({ city: { contains: address.city, mode: 'insensitive' } });
      //   if (address.street) addressFilters.push({ street: { contains: address.street, mode: 'insensitive' } });
      //   if (address.postal_code) addressFilters.push({ postal_code: { contains: address.postal_code, mode: 'insensitive' } });
      //   if (addressFilters.length > 0) {
      //     filters.push({ address: { some: { AND: addressFilters } } } as Prisma.UserWhereInput);
      //   }
      // }
      const totalData = await prisma.user.count({ where: { AND: filters } });
      const data = await prisma.user.findMany({
        where: { AND: filters },
        skip: (page - 1) * limit,
        take: Number(limit),
        select: {
          id: true,
          email: true,
          username: true,
          role: true,
          address: true,
        }
      });
      const pagination: pagination = {
        total_data: totalData,
        limit: Number(limit),
        current_page: Number(page),
        total_page: Math.ceil(totalData / limit),
      };
      return { data, pagination };
    } catch (error) {
      logger.error(error);
      throw new Error('Failed to retrieve products');
    } finally {
      await prisma.$disconnect();
    }
  },
  getUserById: async (id: string) => {
    try {
      const data = await prisma.user.findUnique({ where: { id: id, }, });
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
          address: data.address || userFromDB.address,
          role: data.role as Role || userFromDB.role as Role,
        },
      });
      if (!updatedUser) {
        return null;
      }
      return updatedUser;
    } catch (error) {
      console.error("Error updating user:", error);
      return null;
    }
  }

};
