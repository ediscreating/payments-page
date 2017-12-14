import input from './input';

function CardSecurityCode(el) {
  this._el = el;
  this._input = new CardSecurityCodeInput(this._el.getElementsByClassName('card-security-code__input')[0]);

  this._el.addEventListener('input', e => {
    const val = e.target.value.split('').filter(char => char !== ' ').filter(char => !isNaN(Number(char)))
    e.target.value = val.slice(0, 3).join('');
    this.validate();
  });
}

CardSecurityCode.prototype.validate = function() {
  return this._input.validate();
};

function CardSecurityCodeInput(el) {
  this._el = el;
  this._invalidClass = 'card-security-code__input--invalid';
}

CardSecurityCodeInput.prototype = Object.assign(CardSecurityCodeInput.prototype, input, {
  checkValid() {
    const val = this._el.value;
    return val.length === 3 && val.split('').map(item => !isNaN(Number(item))).indexOf(false) === -1;
  }
});

export default CardSecurityCode;
