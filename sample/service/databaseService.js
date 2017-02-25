module.exports = class DatabaseService {

  constructor(configService) {
    this.configService = configService
    this.constructor.initializeCount = this.constructor.initializeCount || 0
    this.constructor.initializeCount++
  }

  loadProducts() {
    return [
      this.configService.getSecretKey(),
      this.configService.getSecretKey(),
      this.configService.getSecretKey(),
      this.configService.getSecretKey(),
      this.configService.getSecretKey()
    ]
  }
}

