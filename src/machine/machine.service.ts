import { Injectable, ConflictException } from '@nestjs/common';
import { CreateMachineDto } from './dto/create-machine.dto';
import { UpdateMachineDto } from './dto/update-machine.dto';
import { Machine } from './entities/machine.entity';
import { In, Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { MachineStatus } from './entities/machine-status.enum';
import { MachineLog } from 'src/machine_logs/entities/machine_log.entity';

@Injectable()
export class MachineService {
  constructor(
    @InjectRepository(Machine)
    private readonly machineRepository: Repository<Machine>,

    @InjectRepository(MachineLog)
    private readonly machineLogRepository: Repository<MachineLog>,
  ) { }

  async create(createMachineDto: CreateMachineDto) {
    const isExistMachine = await this.machineRepository.findOne({ where: { name: createMachineDto.name } });

    if (isExistMachine) {
      throw new ConflictException('Esta máquina já existe');
    }
    const newMachine = this.machineRepository.create({
      name: createMachineDto.name,
      location: createMachineDto.location,
      latitude: createMachineDto.latitude,
      longitude: createMachineDto.longitude
    });

    return await this.machineRepository.save(newMachine);
  }

  async findAll(params: {
    name?: string
    status?: MachineStatus[]
  }) {

    const where = {};

    if (params.name) where['name'] = Like(`%${params.name}%`);
    if (params.status) where['status'] = params.status;

    return await this.machineRepository.find({ where });
  }

  async findOne(id: string) {
    return await this.machineRepository.findOne({ where: { id }, relations:['logs'] });
  }

  async update(id: string, updateMachineDto: UpdateMachineDto) {
    const isExistMachine = await this.machineRepository.findOne({ where: { id } });

    const logs  = await this.machineLogRepository.create({
      oldData: {
        status: isExistMachine.status,
        location: isExistMachine.location,
        longitude: isExistMachine.longitude,
        latitude: isExistMachine.latitude
      },
      newData: {
        status: updateMachineDto.status,
        location: updateMachineDto.location,
        longitude: updateMachineDto.longitude,
        latitude: updateMachineDto.latitude
      },
      machine: isExistMachine
    });

    await this.machineLogRepository.save(logs);

    return await this.machineRepository.update(id, updateMachineDto);
  }
  
  async updateMachine(id: string, updateMachineDto: UpdateMachineDto) {
    return await this.machineRepository.update(id, updateMachineDto)
  }

  async remove(id: string) {
    return await this.machineRepository.delete(id);
  }

}
