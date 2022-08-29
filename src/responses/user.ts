import { User } from "../database/entities/user";

export type UserResponse = {
  id: number;
  email: string;
  password?: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  dateOfBirth: string;
  createdAt: Date;
  updatedAt: Date;
};

export const transformToUserResponse = (input: User): UserResponse => {
  return {
    id: input.id,
    email: input.email,
    firstName: input.first_name,
    lastName: input.last_name,
    phoneNumber: input.phone_number,
    dateOfBirth: input.date_of_birth,
    createdAt: input.created_at,
    updatedAt: input.updated_at,
  };
};
