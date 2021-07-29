import winston from 'winston';

const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
}

const level = () => {
    const env = process.env.NODE_ENV || 'development'
    const isDevelopment = env === 'development'
    return isDevelopment ? 'debug' : 'warn'
}

const colors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'white',
}

winston.addColors(colors)

const logFormat = winston.format.printf((info) => {
    return `[${info.timestamp}] ${info.level}: ${info.message}`;
});
  
const rawFormat = winston.format.printf((info) => {
    return `[${info.timestamp}] ${info.level}: ${info.message}`;
});

const date = new Date();

let fileName = `app_${date.getFullYear()}${date.getMonth()}${date.getDate()}.log`;

const transports = [
    new winston.transports.Console({
        handleExceptions: true,
        level: 'debug',
        format: winston.format.combine(winston.format.colorize(), winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), logFormat)
    }),
    new winston.transports.File({
        filename: `./logs/debug/${fileName}`,
        level: 'debug',
        format: winston.format.combine(winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), rawFormat)
    })
]

const logger = winston.createLogger({
    level: level(),
    levels,
    transports,
})

export default logger;
