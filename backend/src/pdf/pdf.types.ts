import { IsNotEmpty, IsString } from 'class-validator';

export class DecklistDto {
  @IsString()
  @IsNotEmpty()
  rawList!: string;
}
