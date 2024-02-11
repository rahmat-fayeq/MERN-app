export interface IRegister {
  name: String;
  email: String;
  password: String;
}

export interface ILogin {
  email: String;
  password: String;
}

export interface IGoal {
  text: String;
}

export interface IGoals {
  _id: String;
  user: String;
  text: String;
  createdAt: string | number | Date;
  updatedAt: string | number | Date;
}
