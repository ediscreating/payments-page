import utils from './utils';

const input = {
  validate() {
    const isValid = this.checkValid();
    utils.toggleClass(this._el, this._invalidClass, !isValid);
    return isValid;
  }
};

export default input;
