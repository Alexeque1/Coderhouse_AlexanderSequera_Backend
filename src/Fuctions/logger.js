import winston from "winston";
import config from "../config.js";

const customLevels = {
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        http: 4,
        debug: 5
    },
    colors: {
        debug: 'cyan',
        http: 'blue',
        info: 'green',
        warning: 'yellow',
        error: 'red',
        fatal: 'magenta',
    }
}

export let logger

  if (config.enviroment === "Production") {
    logger = winston.createLogger({
        levels: customLevels.levels,
        transports: [
            new winston.transports.Console({
                level: 'info',
                format: winston.format.combine(
                  winston.format.colorize({colors: customLevels.colors}),
                  winston.format.simple()
                )
              }),
            new winston.transports.File({ 
                filename: 'errors.log', level: 'error' 
            }),
        ],
      });
  } else {
    logger = winston.createLogger({
        levels: customLevels.levels,
        transports: [
            new winston.transports.Console({
                level: 'debug',
                format: winston.format.combine(
                  winston.format.colorize({colors: customLevels.colors}),
                  winston.format.simple()
                )
              })
        ],
      });    
  }