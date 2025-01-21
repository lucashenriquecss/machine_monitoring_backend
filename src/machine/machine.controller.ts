import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, Query } from '@nestjs/common';
import { MachineService } from './machine.service';
import { CreateMachineDto } from './dto/create-machine.dto';
import { UpdateMachineDto } from './dto/update-machine.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('api/v1/machine')
export class MachineController {
  constructor(private readonly machineService: MachineService) { }

  @ApiOperation({ summary: 'Cadastramento de maquinários' })
  @ApiResponse({ status: 201, description: 'Criado com Sucesso' })
  @Post()
  async create(@Body() createMachineDto: CreateMachineDto) {
    try {
      return await this.machineService.create(createMachineDto);
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: error.message,
      }, HttpStatus.FORBIDDEN, {
        cause: error,
      });
    }
  }

  @ApiOperation({ summary: 'Busca de maquinários' })
  @ApiResponse({ status: 200, description: 'Consultado com Sucesso' })
  @Get()
  async findAll(@Query() params) {
    try {
      return await this.machineService.findAll(params);
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: error.message,
      }, HttpStatus.FORBIDDEN, {
        cause: error,
      });
    }
  }

  @ApiOperation({ summary: 'Busca detalhada de maquinário' })
  @ApiResponse({ status: 200, description: 'Consultado com Sucesso' })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.machineService.findOne(id);
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: error.message,
      }, HttpStatus.FORBIDDEN, {
        cause: error,
      });
    }
  }

  @ApiOperation({ summary: 'Atualização de maquinários' })
  @ApiResponse({ status: 204, description: 'Atualizado com Sucesso' })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateMachineDto: UpdateMachineDto) {
    try {
      return await this.machineService.update(id, updateMachineDto);
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: error.message,
      }, HttpStatus.FORBIDDEN, {
        cause: error,
      });
    }
  }

}
