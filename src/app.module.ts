import { Module } from '@nestjs/common';
import { dataSourceOptions } from 'config/database';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MachineModule } from './machine/machine.module';
import { TelimetryModule } from './telimetry/telimetry.module';
import { MachineLogsModule } from './machine_logs/machine_logs.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions), MachineModule, TelimetryModule, MachineLogsModule,UsersModule, AuthModule],
})
export class AppModule {}
