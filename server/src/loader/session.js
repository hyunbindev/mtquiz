import session from 'express-session'
import { RedisStore } from 'connect-redis'
import redisClient from '#loader/redisClient'
import config from '#loader/config'

const redisStore = new RedisStore({
    client: redisClient,
    prefix: "session:",
});

export const sessionMiddleware = session({
    store: redisStore,
    secret: config.session.secret,
    resave: true,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 1000 * 60 *60 *54
    }
});