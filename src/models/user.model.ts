export interface IUser {
  _id: string;
  username: string;
  email: string;
  password: string;
  date_of_birth: string;
}

export interface IUserRegister {
  username: string;
  email: string;
  password: string;
  date_of_birth: string;
}

export interface IUserLogin {
  email: string;
  password: string;
}
