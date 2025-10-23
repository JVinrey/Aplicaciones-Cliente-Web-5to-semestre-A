import { IsString, IsEmail, MinLength, IsUUID } from 'class-validator';

export class CreateUserDto {
  @IsString()
  username: string;

  @IsString()
  first_name: string;

  @IsString()
  last_name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  rol: "cliente" | "proveedor";

  @IsUUID()
  cliente:string

  @IsUUID()
  proveedor:string
}

