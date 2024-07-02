import { Config, EnvConfig } from '../../src/config';

describe('Tests the application config is created as expected.', () => {

    test('if the basic development configuration is created', () => {
        // default 'dev'
        let config: EnvConfig = Config.configuration();
        expect(config.baseAPIUrl).toEqual(`http://${window.location.hostname}:8888`);
        expect(config.errorLogging).toEqual(true);
        expect(config.logging).toEqual(true);
        // development environment
        config = Config.configurationByEnvironment('development');
        expect(config.baseAPIUrl).toEqual(`http://${window.location.hostname}:8888`);
        expect(config.errorLogging).toEqual(true);
        expect(config.logging).toEqual(true);
        // test environment
        config = Config.configurationByEnvironment('test');
        expect(config.baseAPIUrl).toEqual(`http://${window.location.hostname}:8888`);
        expect(config.errorLogging).toEqual(true);
        expect(config.logging).toEqual(true);
        // production environment
        config = Config.configurationByEnvironment('prod');
        expect(config.baseAPIUrl).toEqual(`http://${window.location.hostname}`);
        expect(config.errorLogging).toEqual(true);
        expect(config.logging).toEqual(false);
    });

});
