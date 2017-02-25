# dagger-compiler
Dependency injection for Node like Dagger2 for Android (https://google.github.io/dagger/)


## Install

```
$ npm install --save dagger-compiler
```


## Usage

Checkout sample module for detail implementation.

### Define Component

Component is a central part of dagger. It contains all modules that provide and resolve dependencies

```js
const AppModule = require('./appModule')
const ServiceModule = require('./serviceModule')

@Component(modules = [AppModule, ServiceModule])
module.exports = class AppComponent {

}
```

### Define Module 

Module is reponsible for providing dependency instances. Intances can be Singleton. A Singleton is only valid with Component, not global.

```js
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
```

Naming is important here. `configService` is required for building `DatabaseService`. These are two lines that need to be matched `@Provides('configService')` and `provideDatabaseService(configService) {...}`

### Define Service or any other class depending on application

```js
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
```

### Generate component instance

Use Dagger.Builder to generate component instance. 

```js
const AppComponent = require('./di/appComponent')
const AppModule = require('./di/appModule')
const ServiceModule = require('./di/serviceModule')

const appComponent = new Dagger.Builder(AppComponent)
  .appModule(new AppModule())
  .serviceModule(new ServiceModule())
  .build()
```

Module with empty constructor can be skip while generating component. 

```js
const AppComponent = require('./di/appComponent')
const appComponent = new Dagger.Builder(AppComponent).build()
```

All provided objects can be call from component instance

```js
let configService = appComponent.getConfigService()
let databaseService = appComponent.getDatabaseService()
```

### Access dependencies outside component graph using @Inject

Any other classes that are not in component graph can retrieve data from component after calling `component.inject(this)`

```js
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
```

## Contributing

Any contributions are welcome!  
Please check the [CONTRIBUTING](CONTRIBUTING.md) guideline before submitting a new issue. Wanna send PR? [Click HERE](https://github.com/henrytao-me/smooth-app-bar-layout/pulls)


## License

    Copyright 2017 "Henry Tao <hi@henrytao.me>"

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.

