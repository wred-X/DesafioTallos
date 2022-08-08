export interface UserPayload {
  sub: string;
  email: string;
  name: string;
  age: number;
  description: string;
  owner: boolean;
  iat?: number;
  exp?: number;
}
