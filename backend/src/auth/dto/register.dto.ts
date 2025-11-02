import { IsDateString, IsEmail, IsIn, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @IsString() @IsNotEmpty()
  name!: string;

  @IsString() @IsNotEmpty()
  lastname!: string;

  @IsEmail() @IsNotEmpty()
  email!: string;

  @IsString() @MinLength(8)
  password!: string; // se hashéa en el servicio

  @IsDateString()
  birthdate!: string;

  @IsString() @IsNotEmpty()
  nationality!: string;

  // TCG selection: 'pokemon' | 'yugioh'
  @IsString() @IsIn(['pokemon', 'yugioh'])
  tcg!: 'pokemon' | 'yugioh';

  // Condicionales según tcg
  @IsOptional() @IsString()
  playerId?: string;

  @IsOptional() @IsString()
  konamiId?: string;
}
