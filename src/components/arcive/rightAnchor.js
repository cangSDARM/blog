class RightAnchor {
  _anchor;

  constructor() {}

  replaceOprator(newSubStr = "") {
    this.anchor = this.anchor.replace(/[\+]/g, newSubStr);
    return this;
  }

  replaceWhiteSpace(newSubStr = "-") {
    this.anchor = this.anchor.replace(/\s/g, newSubStr);
    return this;
  }

  splitId() {
    this.anchor = this.anchor.split(/^\d+/).pop();
    return this;
  }

  set anchor(newAnchor) {
    this._anchor = newAnchor;
  }

  get anchor() {
    return this._anchor;
  }

  anchorSet(anchor) {
    this.anchor = anchor;
    return this;
  }
}

export default new RightAnchor();
