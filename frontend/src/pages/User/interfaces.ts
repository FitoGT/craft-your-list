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