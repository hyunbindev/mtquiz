import winston from 'winston';
import config from './config.js';

const { combine, timestamp, json, colorize, printf } = winston.format;

const consoleFormat = printf(({ level, message, timestamp, node_id, ...meta }) => {
    const metaString = Object.keys(meta).length ? JSON.stringify(meta) : '';
    return `[${timestamp}] ${level}: ${message} ${metaString}`;
});

const logger = winston.createLogger({
    level: config.log.level || 'info',
    defaultMeta: { node_id: config.nodeId },
    format: combine(
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    ),
    transports: [
        new winston.transports.Console({
        format: config.nodeEnv === 'development' 
            ? combine(colorize(), consoleFormat) 
            : json()
        })
    ]
});

export default logger;