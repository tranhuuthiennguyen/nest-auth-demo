import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  /**
   * 
   * @param loginDto 
   * @returns 
   */
  @Post('/login')
  async login(@Body() loginDto: LoginDto) {
    return "login"
  }
}
