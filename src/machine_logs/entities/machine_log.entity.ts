import { MachineStatus } from "src/machine/entities/machine-status.enum";
import { Machine } from "src/machine/entities/machine.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('machine_logs')
export class MachineLog {   
    
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'json' })
    oldData: { 
        status: MachineStatus[];
        latitude: number;
        longitude: number;
        location: string;
    };

    @Column({ type: 'json' })
    newData: {
        status: MachineStatus[];
        latitude: number;
        longitude: number;
        location: string;
    };

    @ManyToOne(() => Machine, machine => machine.logs) 
    machine: Machine;
}
