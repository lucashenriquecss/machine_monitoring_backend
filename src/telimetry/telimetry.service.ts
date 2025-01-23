import { Injectable } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { TelimetryGateway } from './telimetry.gateway';
import { UpdateMachineDto } from 'src/machine/dto/update-machine.dto';
import { MachineStatus } from 'src/machine/entities/machine-status.enum';
import { CronJob } from 'cron';

@Injectable()
export class TelimetryService {
  private simulatedMachines: Map<string, UpdateMachineDto> = new Map();

  constructor(
    private schedulerRegistry: SchedulerRegistry,
    private telemetryGateway: TelimetryGateway,
  ) { }
  startMachineSimulation(
    machineId: string,
    baseLocation: { location: string, latitude: number; longitude: number }
  ) {

    const machine: UpdateMachineDto = {
      machineId,
      location: baseLocation.location,
      latitude: baseLocation.latitude,
      longitude: baseLocation.longitude,
      status: [MachineStatus.OPERATING],
    };

    this.simulatedMachines.set(machineId, machine);

    const job = new CronJob(`*/5 * * * * *`, () => {
      this.generateTelemetryData(machineId);
    });

    this.schedulerRegistry.addCronJob(`telemetry_${machineId}`, job);

    job.start();

    return { message: "Sucesso ao iniciar simulação"};
  }

  stopMachineSimulation(machineId: string) {
    try {
      const jobName = `telemetry_${machineId}`;
      const job = this.schedulerRegistry.getCronJob(jobName);
      const machine = this.simulatedMachines.get(machineId);

      job.stop();
      

      if (!machine) return;

      const telemetryData = {
        machineId,
        status: [MachineStatus.OFFLINE],
        location: machine.location,
        latitude: machine.latitude,
        longitude: machine.longitude
      };

      this.telemetryGateway.handleTelemetryUpdate(null, telemetryData);

      this.schedulerRegistry.deleteCronJob(jobName);
      this.simulatedMachines.delete(machineId);

      

      return  { message: "Sucesso ao parar simulação"};;
    } catch (error) {
      console.error(`Failed to stop simulation for machine ${machineId}:`, error);
      return false;
    }
  }

  private generateTelemetryData(machineId: string) {
    const machine = this.simulatedMachines.get(machineId);

    if (!machine) return;

    const locationVariation = 0.0001;

    let newStatus = machine.status;

    const telemetryData = {
      machineId,
      status: newStatus,
      location: machine.location,
      latitude: machine.latitude + (Math.random() - 0.5) * locationVariation,
      longitude: machine.longitude + (Math.random() - 0.5) * locationVariation
    };

    this.telemetryGateway.handleTelemetryUpdate(null, telemetryData);
  }

  getActiveMachines() {
    return Array.from(this.simulatedMachines.keys());
  }
}
