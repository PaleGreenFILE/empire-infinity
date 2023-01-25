export interface User {
  currentUser: string | "loggedOut";
  userId: string;
  email: string;
  emailVerified: boolean;
  refId: number | 0;
  refBy: number | 0;
  country: string;
  phone: string;
  phoneVerified: boolean;
  firstName: string;
  lastName: string;
  termsAccept: boolean;
  uid: string;
  uuid: string;
  createdAt: number;
  linkReferrer: string;
  password: string;
  confirmPassword: string;
  level: number | 0;
}

export type IsLoggedIn = boolean;

export interface UserState {
  currentUser: "loggedOut";
  emailVerified: boolean;
  email: string;
  accessToken: string;
}
