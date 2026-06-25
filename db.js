// database.js
const sql = require('mssql');

class Database {
    constructor() {
        this.config = {
            user: '',
            password: '',
            server: '',
            database: 'Romel',
            options: {
                encrypt: false,
                trustServerCertificate: true
            }
        };

        this.pool = null;
    }

    async connect() {
        try {
            if (!this.pool) {
                this.pool = await sql.connect(this.config);
                console.log('Conectado a SQL Server');
            }

            return this.pool;
        } catch (error) {
            console.error('Error al conectar:', error);
            throw error;
        }
    }

    async query(queryString, params = {}) {
        try {
            const pool = await this.connect();

            const request = pool.request();

            for (const key in params) {
                request.input(key, params[key]);
            }

            const result = await request.query(queryString);

            return result.recordset;
        } catch (error) {
            console.error('Error en query:', error);
            throw error;
        }
    }

    async close() {
        if (this.pool) {
            await this.pool.close();
            this.pool = null;
            console.log('Conexión cerrada');
        }
    }
}

module.exports = new Database();