class Singleton extends Annotation {

	compile() {
		if (!this.isMethod()) {
 			return
 		}
		let annotations = this.getClass().__dagger || {}
    annotations[this.getTarget()] = annotations[this.getTarget()] || {}
    annotations[this.getTarget()].Singleton = {}
    this.getClass().__dagger = annotations
	}
}

module.exports = Singleton