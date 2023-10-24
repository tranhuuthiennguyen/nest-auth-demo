import { IsDefined, IsNotEmpty, MinLength } from "class-validator"

export class RegisterDto {
  @IsDefined()
  @IsNotEmpty()
  username: string

  @IsDefined()
  @IsNotEmpty()
  @MinLength(8)
  password: string
}