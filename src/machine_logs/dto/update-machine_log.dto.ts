import { PartialType } from '@nestjs/swagger';
import { CreateMachineLogDto } from './create-machine_log.dto';

export class UpdateMachineLogDto extends PartialType(CreateMachineLogDto) {}
