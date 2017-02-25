require('core-annotations')

Annotation.register(require('./annotations/componentAnnotation'))
Annotation.register(require('./annotations/injectAnnotation'))
Annotation.register(require('./annotations/moduleAnnotation'))
Annotation.register(require('./annotations/providesAnnotation'))
Annotation.register(require('./annotations/singletonAnnotation'))

class Builder {

  static getParams(func) {
    var COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg
    var DEFAULT_PARAMS = /=[^,]+/mg
    var FAT_ARROWS = /=>.*$/mg
    var code = func.toString()
      .replace(COMMENTS, '')
      .replace(FAT_ARROWS, '')
      .replace(DEFAULT_PARAMS, '')
    var result = code.slice(code.indexOf('(') + 1, code.indexOf(')')).match(/([^\s,]+)/g)
    return result === null ? [] : result
  }

  constructor(clzComponent) {
    this._clzComponent = clzComponent
    this._modules = {}
    this._dependencies = {}
    this._verifyComponent()
    this._initalizeModules()
  }

  build() {
    let component = new this._clzComponent()
    this._resolveDependencies()
    for (let dependencyName of Object.keys(this._dependencies)) {
      this._clzComponent.prototype[`get${dependencyName.replace(/^./, c => c.toUpperCase())}`] = () => this._dependencies[dependencyName].provide()
    }
    this._clzComponent.prototype.inject = object => this._inject(object)
    return component
  }

  _initalizeModules() {
    for (let clzModule of this._clzComponent.__dagger.__class.Component.modules) {
      let moduleName = clzModule.name.replace(/^./, c => c.toLowerCase())
      try {
        this._modules[moduleName] = new clzModule()
      } catch (ignore) {}
      Builder.prototype[moduleName] = module => {
        this._modules[moduleName] = module
        return this
      }
    }
  }

  _inject(object) {
    if (!object.constructor.hasOwnProperty('__dagger')) {
      return
    }
    let dependencies = []
    for (let dependency of Object.keys(object.constructor.__dagger)) {
      if (object.constructor.__dagger[dependency].hasOwnProperty('Inject')) {
        dependencies.push(dependency)
      }
    }
    for (let dependency of dependencies) {
      if (!this._dependencies.hasOwnProperty(dependency)) {
        throw new Error(`Dependency not found <${dependency}>`)
      }
      object[dependency] = this._dependencies[dependency].provide()
    }
  }

  _provide(module, methodName) {
    let params = this.constructor.getParams(module[methodName])
    let args = []
    for (let dependencyName of params) {
      if (!this._dependencies.hasOwnProperty(dependencyName)) {
        throw new Error(`Dependency not found <${dependencyName}>`)
      }
      args.push(this._dependencies[dependencyName].provide())
    }
    return module[methodName].apply(module, args)
  }

  _resolveDependencies() {
    for (let moduleName of Object.keys(this._modules)) {
      let module = this._modules[moduleName]
      let annotations = module.constructor.__dagger
      for (let methodName of Object.keys(annotations)) {
        if (methodName === '__class' || !annotations[methodName].hasOwnProperty('Provides')) {
          continue
        }
        let isSingleton = annotations[methodName].hasOwnProperty('Singleton')
        let key = annotations[methodName].Provides.name
        if (!this._dependencies.hasOwnProperty(key)) {
          this._dependencies[key] = {
            moduleName: moduleName,
            provide: () => {
              if (isSingleton) {
                if (!this._dependencies[key].hasOwnProperty('cache')) {
                  this._dependencies[key].cache = this._provide(module, methodName)
                }
                return this._dependencies[key].cache
              } else {
                return this._provide(module, methodName)
              }
            }
          }
        } else if (this._dependencies[key].moduleName !== moduleName) {
          throw new Error(`Duplicated provider for <${key}> in ${moduleName} and ${this._dependencies[key].moduleName}`)
        }
      }
    }
  }

  _verifyComponent() {
    try {
      if (this._clzComponent.__dagger.__class.Component != null) {
        return
      }
    } catch (ignore) {}
    throw new Error(`Invalid component: <${this._clzComponent.name}>`)
  }
}

global.Dagger = {
  Builder: Builder
}

