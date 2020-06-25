import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, `../../.env.${process.env.NODE_ENV}`) });

// const {
//     PORT,
//     GRPC_PORT,
//     SHARED_APP_KEY,
//     DB_HOST,
//     DB_PORT,
//     DB_USER,
//     DB_PASS,
//     DB_DATABASE,
//     WAREHOUSE_SERVICE_GRPC_URL,
// } = process.env;

console.log(process.env.NODE_ENV);

const port = process.env.PORT || 3000;
const grpcPort = process.env.GRPC_PORT || 50051;
const dbPort = process.env.DB_PORT || 5432;

export const config  = {
    port,
    grpcPort,
    appKey: process.env.SHARED_APP_KEY,
    warehouseServiceGrpcUrl: process.env.WAREHOUSE_SERVICE_GRPC_URL,
    db: {
        host: process.env.DB_HOST,
        port: process.env.dbPort,
        user: process.env.DB_USER,
        pass: process.env.DB_PASS,
        database: process.env.DB_DATABASE,
    }
};
