import input from './input';

function CardNumFieldset(el) {
  this._el = el;

  const inputElements = Array.from(el.getElementsByClassName('card-num-fieldset__input'));

  this._inputs = inputElements.map((element, i) => {
    element.setAttribute('data-index', i);
    return new CardNumFieldsetInput(element);
  });

  this._el.addEventListener('input', e => {
    let val = e.target.value.split('').filter(char => char !== ' ').filter(char => !isNaN(Number(char)));
    e.target.value = val.slice(0, 4).join('');
    this._inputs[e.target.getAttribute('data-index')].validate();
  });
}

CardNumFieldset.prototype.validate = function () {
  return this._inputs.map(input => input.validate()).indexOf(false) === -1;
};

function CardNumFieldsetInput(el) {
  this._el = el;
  this._invalidClass = 'card-num-fieldset__input--invalid';
}

CardNumFieldsetInput.prototype = Object.assign(CardNumFieldsetInput.prototype, input, {
  checkValid() {
    const val = this._el.value;
    return val.length === 4 && val.split('').map(item => !isNaN(Number(item))).indexOf(false) === -1;
  }
});

export default CardNumFieldset;
