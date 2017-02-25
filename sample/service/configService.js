module.exports = class ConfigService {

  constructor() {
    this.constructor.initializeCount = this.constructor.initializeCount || 0
    this.constructor.initializeCount++
  }

  getSecretKey() {
    return 'this-is-my-secret-key'
  }
}

