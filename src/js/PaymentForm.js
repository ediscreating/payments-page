import CardNumFieldset from './CardNumFieldset';
import CardHolderInput from './CardHolderInput';
import CardSecurityCode from './CardSecurityCode';

function PaymentForm(el) {
  this._el = el;
  this._fields = [
    new CardNumFieldset(el.getElementsByClassName('card-num-fieldset')[0]),
    new CardHolderInput(el.getElementsByClassName('card-holder-input')[0]),
    new CardSecurityCode(el.getElementsByClassName('card-security-code')[0])
  ];

  this._el.addEventListener('submit', e => {
    e.preventDefault();
    const isValid = this._fields.map(field => field.validate()).join('').indexOf('false') === -1;
    if (isValid) alert('Form Submitted!');
  })
}

export default PaymentForm;
