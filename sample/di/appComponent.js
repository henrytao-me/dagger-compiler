const AppModule = require('./appModule')
const ServiceModule = require('./serviceModule')

@Component(modules = [AppModule, ServiceModule])
module.exports = class AppComponent {

}

