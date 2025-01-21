import { Controller, Post, Delete, Param, Body, HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { TelimetryService } from './telimetry.service';
import { CreateMachineDto } from 'src/machine/dto/create-machine.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Role } from 'src/utils/jwt/roles.decorator';
import { Roles } from 'src/users/entities/user-roles.enum';
import { JwtAuthGuard } from 'src/utils/jwt/jwt-auth.guard';
import { RolesGuard } from 'src/utils/jwt/roles.guard';

@Controller('api/v1/simulator')
export class TelemetryController {
    constructor(private telemetryService: TelimetryService) { }

    @ApiOperation({ summary: 'Iniciando simulação de maquinários' })
    @ApiResponse({ status: 201, description: 'Simulação inciada com Sucesso' })
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Role(Roles.ADMIN, Roles.COMMON)
    @Post(':machineId')
    startSimulation(@Param('machineId') machineId: string, @Body() createMachineDto: CreateMachineDto) {
        try {
            return this.telemetryService.startMachineSimulation(machineId, {
                location: createMachineDto.location,
                latitude: createMachineDto.latitude,
                longitude: createMachineDto.longitude
            });
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                error: error.message,
            }, HttpStatus.FORBIDDEN, {
                cause: error,
            });
        }
    }

    @ApiOperation({ summary: 'Parando simulação de maquinários' })
    @ApiResponse({ status: 204, description: 'Simulação parada com Sucesso' })
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Role(Roles.ADMIN, Roles.COMMON)
    @Delete(':machineId')
    stopSimulation(@Param('machineId') machineId: string) {
        try {
            return this.telemetryService.stopMachineSimulation(machineId);
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