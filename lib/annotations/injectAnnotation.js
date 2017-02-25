class Inject extends Annotation {

  compile() {
    if (!this.isField()) {
      return;
    }
    let annotations = this.getClass().__annotations || {};
    annotations[this.getTarget()] = annotations[this.getTarget()] || {};
    annotations[this.getTarget()].Inject = {};
    this.getClass().__annotations = annotations;
  }
};

module.exports = Inject;

