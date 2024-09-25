import sql from 'mssql';

const dbSettings = {
    user: 'sa',
    password: 'yourStrong#Password',
    server: 'localhost',
    database: 'CarDB',
    options: {
        encrypt: true,
        trustServerCertificate: true,
    }
}

export const getConnection = async () => {
    try {
       const pool = await sql.connect(dbSettings);
         return pool;
    } catch (error) {
        console.error(error);
    }
}