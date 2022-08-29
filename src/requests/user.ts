import { UserResponse } from "../responses";

export const transformtoUserModel = (input: UserResponse) => {
  return {
    email: input.email,
    password: input.password,
    first_name: input.firstName,
    last_name: input.lastName,
    phone_number: input.phoneNumber,
    date_of_birth: input.dateOfBirth,
  };
};
