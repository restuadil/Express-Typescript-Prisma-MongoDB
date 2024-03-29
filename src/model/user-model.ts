import { $Enums } from "@prisma/client";

export type UserResponse = {
  id: string;
  email: string;
  username: string;
  role: $Enums.Role;
};


export type UserRequest = {
  id: string;
  email: string;
  username: string;
  password: string;
  role: $Enums.Role;
  first_name: string | null;
  last_name: string | null;
  address?: {
    province: string | null;
    city: string | null;
    street: string | null;
    postal_code: string | null;
  }
}

export type UserQuery = {
  email?: string;
  username?: string;
  password?: string;
  role?: string | null;
  first_name?: string | null;
  last_name?: string | null;
  address?: {
    province?: string | null;
    city?: string | null;
    street?: string | null;
    postal_code?: string | null;
  }
  page?: number;
  limit?: number;
}