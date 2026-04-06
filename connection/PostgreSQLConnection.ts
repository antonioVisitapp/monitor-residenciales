import { Pool, PoolClient } from 'pg';

class PostgreSQLConnection {

    
    private pool: Pool;

    constructor() {

        this.pool = new Pool({
            host:process.env.DB_HOST,
            user:process.env.DB_USER,
            password:process.env.DB_PASSWORD,
            database:process.env.DB_DATABASE,
            port:5433 ,
            max:20,
            idleTimeoutMillis:10000,
        })

    }


    async executeQuery(query: string, values?: any[]) {
        let client: PoolClient | undefined
        let result;
        try {
            client = await this.pool.connect();
            result = await client.query(query, values);
            return result
        } catch (error) {
            console.error('Error executing query:', error);
            
            console.log(query);
            console.log(values);
            console.log(error);
        }
        finally {
            if (client) {
                client.release();
            }
        }
    }

    async closePoolConnection() {

        try {
            await this.pool.end();
        } catch (error) {
            console.log(error)
        }
    }


    async createTableIfNoExist(): Promise<void> {

        try {

            const tableName = `residenciales`;
            const tableFields =
                `
                id_residencial SERIAL PRIMARY KEY,
                tenant VARCHAR(30),
                estatus INTEGER,
                api_server VARCHAR(150),
                lastUpdate TIMESTAMP DEFAULT CURRENT_TIMESTAMP
             `

            const query = (`CREATE TABLE IF NOT EXISTS ${tableName}(
                 ${tableFields}
                );
                `);
            await this.executeQuery(query);


        } catch (error) {
            console.log(error)
            return undefined;
        }

    }
    async alterTableResidential(): Promise<void> {

        try {




            const query = (` ALTER TABLE residenciales
      ADD COLUMN lastUpdate TIMESTAMP DEFAULT CURRENT_TIMESTAMP;`);
            await this.executeQuery(query);


        } catch (error) {
            console.log(error)
            return undefined;
        }

    }
    async createTableIfNoExistRaspberrys(): Promise<void> {
        try {
            const tableName = `raspberrys`;
            const tableFields =
                `
                id_raspberry SERIAL PRIMARY KEY,
                timestamp VARCHAR(60),
                cpuUsage FLOAT,
                memoryUsagePercentage FLOAT,
                temperature FLOAT,
                powerUsage FLOAT,
                isConnected BOOLEAN,
                hostname VARCHAR(60),
                offlineCounter FLOAT
             `
            const query = (`CREATE TABLE IF NOT EXISTS ${tableName}(
                 ${tableFields}
                );
                `)
            await this.executeQuery(query);


        } catch (error) {
            console.log(error)
            return undefined;
        }
    }
    async createTableIfNotExistRoles(): Promise<void> {
        try {
            const tableName = `roles`;
            const tableFields =
                `
                id_rol SERIAL PRIMARY KEY,
                nombre VARCHAR(50) NOT NULL,
                descripcion VARCHAR(60)
             `
            const query = (`CREATE TABLE IF NOT EXISTS ${tableName}(
                 ${tableFields}
                );
                `)
            await this.executeQuery(query);


        } catch (error) {
            console.log(error)
            return undefined;
        }
    }
    async createTableIfNotExistUsuarios(): Promise<void> {
        try {
            const tableName = `usuarios`;
            const tableFields =
                `
                id_usuario SERIAL PRIMARY KEY,
                userName VARCHAR(40),
                email VARCHAR(60),
                password VARCHAR(40),
                estatus BOOLEAN,
                id_rol  INTEGER,
                FOREIGN KEY (id_rol) REFERENCES roles(id_rol)
             `
            const query = (`CREATE TABLE IF NOT EXISTS ${tableName}(
                 ${tableFields}
                );
                `)
            await this.executeQuery(query);


        } catch (error) {
            console.log(error)
            return undefined;
        }
    }
    async createTableIfNotExistQrsHistory(): Promise<void> {
        try {
            const tableName = `qr_scans`;
            const tableFields =
                `
                id_qr SERIAL PRIMARY KEY,
                userName VARCHAR(40),
                tenant VARCHAR(40),
                qr_code VARCHAR(60),
                desc_visitapp VARCHAR(60),
                liberacion_pulso BOOLEAN,
                fecha  VARCHAR(60),
                id_raspberry INTEGER
                FOREIGN KEY (id_raspberry) REFERENCES raspberrys(id_raspberry)
             `
            const query = (`CREATE TABLE IF NOT EXISTS ${tableName}(
                 ${tableFields}
                );
                `)
            await this.executeQuery(query);


        } catch (error) {
            console.log(error)
            return undefined;
        }
    }
    async insertsPrueba(): Promise<void> {
        try {
            const tableName = `usuarios`;
            const tableFields =
                `
                id_usuario SERIAL PRIMARY KEY,
                userName VARCHAR(40),
                email VARCHAR(60),
                password VARCHAR(40),
                estatus BOOLEAN,
                id_rol  INTEGER,
                FOREIGN KEY (id_rol) REFERENCES roles(id_rol)
             `
            const query = (`CREATE TABLE IF NOT EXISTS ${tableName}(
                 ${tableFields}
                );
                `)
            await this.executeQuery(query);


        } catch (error) {
            console.log(error)
            return undefined;
        }
    }



}





export default PostgreSQLConnection;