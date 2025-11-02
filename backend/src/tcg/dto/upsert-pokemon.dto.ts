import { IsString, IsNotEmpty } from 'class-validator';

export class UpsertPokemonDto {
  @IsString() @IsNotEmpty()
  userId!: string;

  @IsString() @IsNotEmpty()
  playerId!: string;
}
