import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpException, HttpStatus, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from './entities/user-roles.enum';
import { JwtAuthGuard } from 'src/utils/jwt/jwt-auth.guard';
import { RolesGuard } from 'src/utils/jwt/roles.guard';
import { Role } from 'src/utils/jwt/roles.decorator';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('api/v1/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  @ApiOperation({ summary: 'Criar um novo usuario' })
  @ApiResponse({ status: 201, description: 'usuario criado com sucesso.' })
  async create(@Body() createUserDto: CreateUserDto) {
    try {

      return await this.usersService.create(createUserDto);
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: error.stack,
      }, HttpStatus.FORBIDDEN, {
        cause: error
      });
    }
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Role(Roles.ADMIN, Roles.COMMON)
  @Get()
  @ApiOperation({ summary: 'Buscar todos os usuarios' })
  @ApiResponse({ status: 200, description: 'Lista de usuarios retornada com sucesso.' })
  async findAll(@Req() req) {
    try {
      const user = req.user;

      if ([Roles.COMMON].includes(user.roles)) {
        return await this.usersService.findOneByUser(user.id, user);
      }
      return await this.usersService.findAll();
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: error.stack,
        },
        HttpStatus.FORBIDDEN,
        {
          cause: error,
        },
      );
    }
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Role(Roles.ADMIN, Roles.COMMON)
  @Patch('/type/:id')
  async updateTypeUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      return await this.usersService.updateType(id, updateUserDto);

    } catch (error) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: error.stack,
      }, HttpStatus.FORBIDDEN, {
        cause: error
      });
    }
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Role(Roles.ADMIN)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.usersService.remove(id);
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: error.stack,
      }, HttpStatus.FORBIDDEN, {
        cause: error
      });
    }
  }
}
