import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Machine } from 'src/machine/entities/machine.entity';
import { MachineLog } from './entities/machine_log.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Machine, MachineLog])],
  providers: [],
})
export class MachineLogsModule {}
