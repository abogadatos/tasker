"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)({ path: '.development.env' });
exports.default = (0, config_1.registerAs)('typeorm', () => ({
    type: 'postgres',
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    entities: ['dist/**/*.entity{.ts,.js}'],
    migrations: ['dist/migrations/*{.ts,.js}'],
    autoLoadEntities: true,
    logger: 'advanced-console',
    synchronize: process.env.DB_SYNC === 'true',
    logging: true,
    dropSchema: true,
    retryAttempts: parseInt(process.env.DB_RETRY_ATTEMPTS, 10) || 5,
    retryDelay: parseInt(process.env.DB_RETRY_DELAY, 10) || 3000,
}));
//# sourceMappingURL=typeorm.js.map