require('../lib') // change this to require('dagger-compiler') in your production code

const AppComponent = require('./di/appComponent')
const AppModule = require('./di/appModule')
const ServiceModule = require('./di/serviceModule')

const appComponent = new Dagger.Builder(AppComponent)
  .appModule(new AppModule())
  .serviceModule(new ServiceModule())
  .build()

/*
 * Initializing module can be skipped if its constructor is empty
 */

// const appComponent = new Dagger.Builder(AppComponent).build()

/*
 * All provided objects can be call from component instance
 */

let configService = appComponent.getConfigService()
let databaseService = appComponent.getDatabaseService()

console.log(`configService.getSecretKey() === '${configService.getSecretKey()}'`)
console.log(`databaseService.loadProducts() === ${JSON.stringify(databaseService.loadProducts())}`)

/*
 * configService is provided as Singleton. So that, its instance is singleton within component scope. 
 * databaseService is provided as normal. So that, it will return new instance every time it is requested. 
 */
let configService2 = appComponent.getConfigService()
let databaseService2 = appComponent.getDatabaseService()
console.log(`configService.instanceCount === ${configService.instanceCount}`)
console.log(`configService2.instanceCount === ${configService2.instanceCount}`)
console.log(`databaseService.instanceCount === ${databaseService.instanceCount}`)
console.log(`databaseService2.instanceCount === ${databaseService2.instanceCount}`)

/*
 * Any other classes that are not in component graph can retrieve data from component after calling component.inject(this)
 */
const MainController = require('./controllers/mainController')
let mainController = new MainController(appComponent)
console.log(`mainController.getSecretKeyFromConfigService() === '${mainController.getSecretKeyFromConfigService()}'`)
console.log(`mainController.loadProductsFromDatabaseService() === ${JSON.stringify(mainController.loadProductsFromDatabaseService())}`)

