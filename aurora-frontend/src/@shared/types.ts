export interface User {
  id: string;
  name: string;
  email: string;
  roles: string[];
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface AccessToken {
  token: string;
  expiresIn: string;
}

export interface AuthResponse {
  user: User;
  accessToken: AccessToken;
}
