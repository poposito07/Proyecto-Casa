"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const promise_1 = require("mysql2/promise");
dotenv_1.default.config();
const defaultPort = 3306; // Puerto predeterminado si no se encuentra en las variables de entorno
// Obtener el puerto de las variables de entorno y convertirlo a número
let port = parseInt(process.env.DB_PORT || '', 10);
if (isNaN(port)) {
    console.warn('Invalid DB_PORT, using default port:', defaultPort);
    port = defaultPort;
}
const pool = (0, promise_1.createPool)({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'house_simulation',
    port: port,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});
exports.default = pool;
