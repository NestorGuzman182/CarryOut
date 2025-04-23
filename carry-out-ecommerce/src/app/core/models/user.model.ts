export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  avatar: string;
}

export type ICreateUserDTO = Omit<IUser, 'id'>;
export type ILoginDTO = Pick<IUser, 'email' | 'password'>;
