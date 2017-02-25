module.exports = class ConfigService {

  constructor() {
    this.constructor._count = this.constructor._count || 0
    this.constructor._count += 1
    this.instanceCount = this.constructor._count
  }

  getSecretKey() {
    return 'this-is-my-secret-key'
  }
}

