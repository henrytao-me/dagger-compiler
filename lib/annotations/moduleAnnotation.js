class Module extends Annotation {

  compile() {
  	if (!this.isClass()) {
 			return
 		}
    let annotations = this.getClass().__dagger || {}
    annotations.__class = annotations.__class || {}
    annotations.__class.Module = this.getValues() || {}
    this.getClass().__dagger = annotations
  }
}

module.exports = Module

