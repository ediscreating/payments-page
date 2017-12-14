import PaymentForm from './PaymentForm';
import wrapSelectWithDropdown from './wrapSelectWithDropdown';

new PaymentForm(document.getElementsByClassName('payment-form')[0]);

const selects = [];

Array.from(document.getElementsByClassName('js-dropdown')).forEach(wrapSelectWithDropdown);
