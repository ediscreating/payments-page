import Dropdown from './Dropdown';

const selects = [];

function wrapSelectWithDropdown(element) {
  let options = element.options;

  if (!options) {
    const select = element.getElementsByTagName('select')[0];
    if (select) {
      select.setAttribute('tabindex', -1);
      options = select.options;
      selects.push(select);
    } else return;
  }

  const dropdown = document.createElement('div');
  const toggle = document.createElement('div');
  const list = document.createElement('ul');

  dropdown.setAttribute('data-index', selects.length - 1);

  dropdown.className = 'dropdown';
  toggle.className = 'dropdown__toggle';
  list.className = 'dropdown__list';
  dropdown.appendChild(toggle);
  dropdown.appendChild(list);

  let item = null;

  for (let i = 0; i < options.length; i++) {
    item = document.createElement('li');
    item.className = "dropdown__list-item";
    item.appendChild(document.createTextNode(options[i].value));
    list.appendChild(item);
  }

  const next = element.nextSibling;
  const parent = element.parentNode;
  dropdown.appendChild(element);
  parent.insertBefore(dropdown, next);

  return new Dropdown(dropdown, handleSelect);
}

function handleSelect(dropdown, index, value) {
  const select = selects[dropdown.getElement().getAttribute('data-index')];
  select.selectedIndex = index;
}

export default wrapSelectWithDropdown;
