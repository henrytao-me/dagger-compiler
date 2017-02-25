const ConfigService = require('../service/configService')
const DatabaseService = require('../service/databaseService')

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

