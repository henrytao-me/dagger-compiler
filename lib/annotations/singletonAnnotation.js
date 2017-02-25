class Singleton extends Annotation {

	compile() {
		if (!this.isMethod()) {
 			return;
 		}
		let annotations = this.getClass().__annotations || {};
    annotations[this.getTarget()] = annotations[this.getTarget()] || {};
    annotations[this.getTarget()].Singleton = {};
    this.getClass().__annotations = annotations;
	}
};

module.exports = Singleton;