import { Module } from '@nestjs/common';
import { TelimetryService } from './telimetry.service';
import { TelimetryGateway } from './telimetry.gateway';
import { ScheduleModule } from '@nestjs/schedule';
import { MachineModule } from 'src/machine/machine.module';
import { TelemetryController } from './telimetry.controller';

@Module({
  imports: [
    ScheduleModule.forRoot(), MachineModule,
  ],
  controllers: [TelemetryController],
  providers: [TelimetryGateway, TelimetryService],
})
export class TelimetryModule {}
