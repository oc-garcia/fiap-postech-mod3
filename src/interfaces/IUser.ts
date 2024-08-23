export interface IUserCredentials {
  username: string;
  password: string;
  confirmPassword?: string;
}

export interface IUser extends IUserCredentials {
  name: string;
  cpf: string;
}
