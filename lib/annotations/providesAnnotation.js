class Provides extends Annotation {

	compile() {
		if (!this.isMethod()) {
 			return;
 		}
		let annotations = this.getClass().__annotations || {};
    annotations[this.getTarget()] = annotations[this.getTarget()] || {};
    annotations[this.getTarget()].Provides = this.getValues();
    this.getClass().__annotations = annotations;
	}
};

module.exports = Provides;