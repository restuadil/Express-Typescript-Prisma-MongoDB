export type UserResponse = {
  id: string;
  email: string;
  username: string;
  password: string | null;
  first_name: string | null;
  last_name: string | null;
};


export type UserRequest = {
  email: string;
  username: string;
  password: string;
  first_name: string | null;
  last_name: string | null;
}