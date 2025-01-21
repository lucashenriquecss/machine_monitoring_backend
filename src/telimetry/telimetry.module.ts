import { Module } from '@nestjs/common';
import { TelimetryService } from './telimetry.service';
import { TelimetryGateway } from './telimetry.gateway';
import { ScheduleModule } from '@nestjs/schedule';
import { MachineModule } from 'src/machine/machine.module';

@Module({
  imports: [
    ScheduleModule.forRoot(), MachineModule,
  ],
  providers: [TelimetryGateway, TelimetryService],
})
export class TelimetryModule {}
