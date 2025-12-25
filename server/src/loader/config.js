import dotenv from 'dotenv';

dotenv.config();


const config = {
    nodeEnv: process.env.NODE_ENV || 'development',

    session: {
        secret: process.env.SESSION_SECRET || 'DEFAULT_SESSION_SECRET',
    },
    redis: {
        url: process.env.REDIS_URL || 'redis://localhost:6379',
    },
    log: {
        level: process.env.LOG_LEVEL || 'info',
    }
}

export default config;