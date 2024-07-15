import nextSession from 'next-session';
import connectRedis from 'connect-redis';
import session from 'express-session';
import Redis from 'ioredis';
import { NextFunction, Request, Response } from 'express';


// Create Redis client
const redisClient = new Redis(process.env.REDIS_URL);

// Initialize RedisStore
let RedisStore = require('connect-redis')(session)

// const options = {
//     store: new RedisStore({ client: redisClient }),
//     cookieName: 'myapp_cookie',
//     secret: process.env.SECRET_COOKIE_PASSWORD,
//     cookie: {
//         secure: process.env.NODE_ENV === 'production', // Secure cookies in production
//         httpOnly: true,
//         maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
//     },
// };

// export const getSession = nextSession(options);

const sessionMiddleware = session({
    store: new RedisStore({ client: redisClient }),
    secret: process.env.SECRET_COOKIE_PASSWORD,
    resave: false, // required: force lightweight session keep alive (touch)
    saveUninitialized: false, // recommended: only save session when data exists
    cookie: {
        secure: process.env.NODE_ENV === 'production', // Secure cookies in production
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    },
});

export const applySession = (req: Request, res: Response, next: NextFunction) => {
    return sessionMiddleware(req, res, next);
};
