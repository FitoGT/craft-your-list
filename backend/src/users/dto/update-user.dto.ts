import { IsEmail, IsOptional, IsString, IsISO8601, ValidateNested, IsObject } from 'class-validator';
import { Type } from 'class-transformer';

class PokemonInfoDto {
  @IsString()
  playerId!: string;
}

class YugiohInfoDto {
  @IsString()
  konamiId!: string;
}

export class UpdateUserDto {
  @IsOptional() @IsString() name?: string;
  @IsOptional() @IsString() lastname?: string;
  @IsOptional() @IsEmail() email?: string;
  @IsOptional() @IsISO8601() birthdate?: string;
  @IsOptional() @IsString() nationality?: string;

  @IsOptional() @IsObject() @ValidateNested() @Type(() => PokemonInfoDto)
  pokemonInfo?: PokemonInfoDto | null;

  @IsOptional() @IsObject() @ValidateNested() @Type(() => YugiohInfoDto)
  yugiohInfo?: YugiohInfoDto | null;
}
