import input from './input';

function CardHolderInput(el) {
  this._el = el;
  this._invalidClass = 'card-holder-input--invalid';
  this._latinRegex = /[A-Za-z\s]+/g;

  this._el.addEventListener('input', e => {
    const val = e.target.value.match(this._latinRegex);
    e.target.value = val === null ? '' : val.join('');
    this.validate();
  });
}

CardHolderInput.prototype = Object.assign(CardHolderInput.prototype, input, {
  checkValid() {
    const match = this._el.value.match(this._latinRegex);
    return this._el.value.length >= 4 && match !== null && this._el.value === match.join('');
  }
});

export default CardHolderInput;
