import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  lastname!: string;

  @IsDateString()
  birthdate!: string;

  @IsString()
  @IsNotEmpty()
  nationality!: string;
}
