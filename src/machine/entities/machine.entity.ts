import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { MachineStatus } from "./machine-status.enum";
import { MachineLog } from "src/machine_logs/entities/machine_log.entity";

@Entity('machines')
export class Machine {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', nullable: false, length: 50 })
    name: string;

    @Column({ type: 'varchar', nullable: false, length: 100 })
    location: string;

    @Column({ type: 'decimal', precision: 10, scale: 7, nullable: true })
    latitude: number;

    @Column({ type: 'decimal', precision: 10, scale: 7, nullable: true })
    longitude: number;

    @Column({ type: 'enum', enum: MachineStatus, default: [MachineStatus.OFFLINE] })
    status: MachineStatus[];

    @CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone'})
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp with time zone' })
    updatedAt: Date;

    @OneToMany(() => MachineLog, log => log.machine)
    logs: MachineLog[]; 
}
