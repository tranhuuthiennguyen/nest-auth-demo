import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { EntityManager, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly entityManager: EntityManager
  ) { }

  async create(createUserDto: CreateUserDto) {
    const user = new User(createUserDto)
    return await this.entityManager.save(user)
  }

  async findAll() {
    return await this.usersRepository.find()
  }

  async findOne(id: number) {
    return await this.usersRepository.findOneBy({ id })
  }

  async findOneByUsername(username: string) {
    return await this.usersRepository.findOne({
      where: {
        username: username
      }
    })
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.findOneBy({ id })
    user.username = updateUserDto.username
    user.hashed_password = updateUserDto.hashed_password
    return await this.entityManager.save(user)
  }

  async remove(id: string) {
    return await this.usersRepository.delete(id)
  }
}
