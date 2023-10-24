import { PartialType } from '@nestjs/mapped-types';

export class UpdateUserDto {
  username: string;
  hashed_password: string;
}
