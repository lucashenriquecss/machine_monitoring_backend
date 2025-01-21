import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { hashPassword } from 'src/utils/jwt/crypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await hashPassword(createUserDto.password);

    const newUserDto: CreateUserDto = {
      name: createUserDto.name,
      email: createUserDto.email,
      password: hashedPassword,
      phone: createUserDto.phone,
      roles: createUserDto.roles,
    };

    const resultCreateUser = this.userRepository.create(newUserDto);

    return await this.userRepository.save(resultCreateUser);
  }

  async findAll() {
    const resultCreateUser = this.userRepository.find();
    return resultCreateUser;
  }

  async findOne(id: string, params) {
    try {
      const where = {};

      if (id) where['id'] = id;

      if (params.name) where['name'] = params.name;
      if (params.email) where['email'] = params.email;
      if (params.roles) where['roles'] = params.roles;

      return await this.userRepository.findOne({ where }); 
    } catch (error) {
      console.log(error);
    }
  }
  
  async findOneByUser(id: string, user) {
  
    return this.userRepository.findOne({
      where: { id },
    });
  }

  

  async update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async updateType(id: string, updateUserDto: UpdateUserDto) {
    if(!updateUserDto.roles){
      throw new UnauthorizedException();
    }
    return await this.userRepository.update(+id, updateUserDto);
  }

  async remove(id: string) {
    return `This action removes a #${id} user`;
  }

  async findOneEmail(email: string): Promise<User | undefined> {
    return await this.userRepository.findOne({ where: { email } });
  }

  async findOneById(id: string): Promise<User | undefined> {
    return await this.userRepository.findOne({ where: { id } });
  }
}
