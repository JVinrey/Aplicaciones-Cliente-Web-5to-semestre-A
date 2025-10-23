  import { IsString, IsEmail, MinLength, IsUUID, IsOptional } from 'class-validator';

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
    @IsOptional()
    cliente?:string

    @IsUUID()
    @IsOptional()
    proveedor?:string
  }

