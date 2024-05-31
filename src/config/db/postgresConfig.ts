import { DataSource } from "typeorm";
import { User } from "../../domain/model/User";

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'kannan',
    database: 'postgres',
    entities: [User]
})
