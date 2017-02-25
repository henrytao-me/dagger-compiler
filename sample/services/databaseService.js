module.exports = class DatabaseService {

  constructor(configService) {
    this.configService = configService
    this.constructor._count = this.constructor._count || 0
    this.constructor._count += 1
    this.instanceCount = this.constructor._count
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

