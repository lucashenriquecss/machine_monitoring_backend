import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsEnum, IsOptional, Length, IsNumber, IsDecimal } from "class-validator";
import { MachineStatus } from "../entities/machine-status.enum";

export class CreateMachineDto {

    @ApiProperty({
        description: 'ID da máquina',
        example: 'Máquina B23005',
        maxLength: 50,
    })
    machineId?: string;


    @IsNotEmpty()
    @IsString()
    @Length(3, 50)
    @ApiProperty({
        description: 'Nome da máquina',
        example: 'Máquina B23005',
        maxLength: 50,
    })
    readonly name: string;

    @IsNotEmpty()
    @IsString()
    @Length(5, 100)
    @ApiProperty({
        description: 'Localização da máquina',
        example: 'Setor A - Linha de Produção',
        maxLength: 100,
    })
    readonly location: string;

    @IsNotEmpty()
    @IsDecimal({ force_decimal: true, decimal_digits: 7 })
    @ApiProperty({
        description: 'Latitude da máquina',
        example: 10.0000000,
    })
    readonly latitude: number;

    @IsNotEmpty()
    @IsDecimal({ force_decimal: true, decimal_digits: 7 })
    @ApiProperty({
        description: 'Longitude da máquina',
        example: 10.0000000,
    })
    readonly longitude: number;


    @IsOptional()
    @IsEnum(MachineStatus, { each: true })
    @ApiProperty({
        description: 'Status da máquina (valores permitidos)',
        example: [MachineStatus.MAINTENANCE, MachineStatus.DESCONTINUED, MachineStatus.ERROR, MachineStatus.OPERATING, MachineStatus.OFFLINE],
        enum: MachineStatus,
        isArray: true,
        required: false,
    })
    readonly status?: MachineStatus[];
}
