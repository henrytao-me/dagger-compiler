module.exports = class MainController {

	// This will return configService that is provided from component after calling component.inject(this)
  @Inject configService

  // This will return databaseService that is provided from component after calling component.inject(this)
  @Inject databaseService

  constructor(component) {
    component.inject(this)
  }

  getSecretKeyFromConfigService() {
    return this.configService.getSecretKey()
  }

  loadProductsFromDatabaseService() {
    return this.databaseService.loadProducts()
  }
}

