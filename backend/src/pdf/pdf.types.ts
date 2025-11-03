import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class DecklistDto {
  @IsString()
  @IsNotEmpty()
  rawList!: string;

  @IsOptional()
  @IsString()
  userId?: string
}
