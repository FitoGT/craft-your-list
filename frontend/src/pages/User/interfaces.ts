// src/features/auth/interfaces.ts

export interface UserResponse {
  id: string;
  name: string;
  lastname: string;
  birthdate: string;
  nationality: string;
  email: string;
  passwordHash: string;
  createdAt: string;
  updatedAt: string;
  pokemonInfo?: { userId: string; playerId: string; createdAt: string; updatedAt: string } | null;
  yugiohInfo?: { userId: string; konamiId: string; createdAt: string; updatedAt: string } | null;
}

export interface RegisterResponse {
  token: string;
  user: UserResponse;
}

export interface RegisterData {
  password: string;
  name: string;
  lastname: string;
  email: string;
  birthdate: string;
  nationality: string;
  tcg: 'pokemon' | 'yugioh';
  playerId?: string;
  konamiId?: string;
}
