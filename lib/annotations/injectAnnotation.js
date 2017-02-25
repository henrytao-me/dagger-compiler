class Inject extends Annotation {

  compile() {
    if (!this.isField()) {
      return
    }
    let annotations = this.getClass().__dagger || {}
    annotations[this.getTarget()] = annotations[this.getTarget()] || {}
    annotations[this.getTarget()].Inject = {}
    this.getClass().__dagger = annotations
  }
}

module.exports = Inject

