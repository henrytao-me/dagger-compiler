const ConfigService = require('../services/configService')
const DatabaseService = require('../services/databaseService')

@Module
module.exports = class ServiceModule {

  @Singleton
  @Provides('configService')
  provideConfigService() {
    return new ConfigService(...arguments)
  }

  @Provides('databaseService')
  provideDatabaseService(configService) {
    return new DatabaseService(...arguments)
  }
}

