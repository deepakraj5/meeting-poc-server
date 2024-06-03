import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'rooms' })
export class Room {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ name: 'room_id' })
    roomId: string

}
