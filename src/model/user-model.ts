import { User } from "@prisma/client";

export type UserResponse = {
    id: string,
    email: string,
    username: string,
    password: string
    first_name?: string,
    last_name?: string
}