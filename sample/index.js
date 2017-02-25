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
let databaseSerice = appComponent.getDatabaseService()

console.log(configService.getSecretKey())
console.log(databaseSerice.loadProducts())

