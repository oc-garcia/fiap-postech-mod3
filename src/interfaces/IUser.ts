export interface IUserCredentials {
  username: string;
  password: string;
  confirmPassword?: string;
}

export interface IUser extends IUserCredentials {
  id?: number;
  email: string;
  name: string;
  cpf: string;
}
