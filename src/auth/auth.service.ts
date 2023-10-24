import { ConflictException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt'
import { User } from 'src/users/entities/user.entity';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import { IJwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) { }

  async validateUser(username: string, password: string) {
    const user = await this.usersService.findOneByUsername(username)
    if (user && bcrypt.compareSync(password, user.hashed_password)) {
      const { hashed_password, ...result } = user
      return result
    }

    return null
  }

  async register(registerDto: RegisterDto): Promise<User> {
    const { username, password } = registerDto
    const existingUser = await this.usersService.findOneByUsername(username)

    if (existingUser) {
      throw new ConflictException("Username already taken")
    }

    const saltRounds = 10
    const hashedPassword = bcrypt.hashSync(password, saltRounds)
    return await this.usersService.create({
      username: registerDto.username,
      hashed_password: hashedPassword
    })
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id }
    return {
      access_token: this.jwtService.sign(payload)
    }
  }

  async verifyPayload(payload: IJwtPayload): Promise<User | void> {
    let user: User
  }

  signToken(user: User): string {
    const payload = {
      sub: user.username
    }

    return this.jwtService.sign(payload)
  }
}
