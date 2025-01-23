import { OnGatewayConnection, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { MachineService } from 'src/machine/machine.service';
import { Server, Socket } from 'socket.io';
import { UpdateMachineDto } from 'src/machine/dto/update-machine.dto';
import { UpdateTelimetryDto } from './dto/update-telimetry.dto';

@WebSocketGateway({
  cors: {
    origin: '*',
    methods: ['GET', 'PATCH'],
  },
})
export class TelimetryGateway implements OnGatewayConnection{
  @WebSocketServer()
  server: Server;

  constructor(private readonly machinesService: MachineService) {}

  handleConnection(client: any) {
    console.log(`Client connected: ${client.id}`);
  }

  @SubscribeMessage('telemetry-update')
  async handleTelemetryUpdate(client: Socket, payload: UpdateMachineDto) {
    try {
      const updatedMachine = await this.machinesService.update(
        payload.machineId,
        {
          status: payload.status,
          location: payload.location,
          latitude: payload.latitude,
          longitude: payload.longitude,
        }
      );

      this.server.emit(`machine-${payload.machineId}`, payload);

      this.server.emit('telemetry-broadcast', payload);

      return { success: true, data: updatedMachine };
    } catch (error) {
      console.error('Telemetry update error:', error);
      return { success: false, error: error.message };
    }
  }

  @SubscribeMessage('monitor-machine')
  handleMonitorMachine(client: Socket, machineId: string) {
    console.log(client.id)
    client.join(`machine-${machineId}`);
    return { success: true, message: `Monitoring machine ${machineId}` };
  }
}
