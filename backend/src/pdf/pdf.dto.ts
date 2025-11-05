import { IsNotEmpty, IsOptional, IsString, IsIn } from 'class-validator';

export class DecklistDto {
  @IsString()
  @IsNotEmpty()
  rawList!: string;

  @IsOptional()
  @IsString()
  userId?: string;

  @IsString()
  @IsIn(['pokemon', 'yugioh'])
  tcg!: 'pokemon' | 'yugioh';
}
