import { EnvConfig } from './EnvConfig';

/**
 * Sets application configuration properites for each environment. i.e. one for development and one for production.
 *
 * Add properties as needed.
 */

export class Config {

    private static readonly BASE_API_URL: string = `http://${window.location.hostname}:8888`;

    public static configuration(environment: 'development' | 'test' | 'prod' = 'development'): EnvConfig {
        return Config.environmentConfiguration(process.env.REACT_APP_ENV || environment);
    }

    public static configurationByEnvironment(environment: 'development' | 'test' | 'prod' = 'development'): EnvConfig {
        return Config.environmentConfiguration(environment);
    }

    private static environmentConfiguration(environment: string): EnvConfig {
        const configs: Configs = {
            development: {
                baseAPIUrl: `${Config.BASE_API_URL}`,
                errorLogging: true,
                logging: true,
                reduxLogging: true
            },
            test: {
                baseAPIUrl: `${Config.BASE_API_URL}`,
                errorLogging: true,
                logging: true,
                reduxLogging: false
            },
            prod: {
                baseAPIUrl: `http://${window.location.hostname}`,
                errorLogging: true,
                logging: false,
                reduxLogging: false
            }
        };

        const config = configs[environment];
        if (!config) {
            throw new Error(`Unknown environment '${environment}'`);
        }
        return config;
    }
}

interface Configs {
    [envName: string]: EnvConfig;
}
