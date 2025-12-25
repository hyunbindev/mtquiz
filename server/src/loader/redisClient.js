import { createClient } from 'redis'
import config from '#loader/config'
import logger from '#loader/logger'


const redisClient = createClient({
    url: config.redis.url
});

redisClient.on('connect', () => logger.info('Connecting to Redis...'));
redisClient.on('ready', () => logger.info('Redis Client Ready'));
redisClient.on('error', (err) => logger.error('Redis Client Error', { err }));
redisClient.on('end', () => logger.warn('Redis Connection Ended'));

/**
 * redis connection
 */
export const connectRedis = async ()=>{
    try{
        if(!redisClient.isOpen) await redisClient.connect();
    }catch(e){
        logger.error('fail to connect Redis');
    }
};

export default redisClient;