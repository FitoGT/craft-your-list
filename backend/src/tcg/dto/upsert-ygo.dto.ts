import { IsString, IsNotEmpty } from 'class-validator';

export class UpsertYgoDto {
  @IsString() @IsNotEmpty()
  userId!: string;

  @IsString() @IsNotEmpty()
  konamiId!: string;
}
