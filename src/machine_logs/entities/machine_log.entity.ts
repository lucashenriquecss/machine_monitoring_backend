import { MachineStatus } from "src/machine/entities/machine-status.enum";
import { Machine } from "src/machine/entities/machine.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('machine_logs')
export class MachineLog {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'json', name: 'old_data' })
    oldData: {
        status: MachineStatus[];
        latitude: number;
        longitude: number;
        location: string;
    };

    @Column({ type: 'json', name: 'new_data' })
    newData: {
        status: MachineStatus[];
        latitude: number;
        longitude: number;
        location: string;
    };

    @CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone'})
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp with time zone' })
    updatedAt: Date;

    @ManyToOne(() => Machine, machine => machine.logs)
    machine: Machine;
}
