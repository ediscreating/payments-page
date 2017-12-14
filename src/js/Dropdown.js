import utils from './utils';

const dropdowns = [];

function Dropdown(el, onSelect) {
  this._el = el;
  this._list = this._el.getElementsByClassName('dropdown__list')[0];
  this._toggle = this._el.getElementsByClassName('dropdown__toggle')[0];
  this._activeClass = 'dropdown--active';
  this._isActive = this._el.className.indexOf(this._activeClass) !== -1;
  this._isFocused = false;
  this._firstClick = false;

  this._toggle.style.height = this._el.clientHeight + 'px';
  this._toggle.style.width = this._el.clientWidth + 'px';

  const items = this._list.children;
  for (let i = 0; i < items.length; i++) {
    items[i].setAttribute('data-index', i);
  }

  this._el.setAttribute('tabindex', 0);

  let clicking = false;

  this._el.addEventListener('focus', () => {
    if (!clicking) this.focus();
  });

  this._el.addEventListener('blur', () => {
    if (!clicking) this.blur();
  });

  this._el.addEventListener('mousedown', () => {
    clicking = true;
  });

  this._el.addEventListener('click', e => {
    if (e.target === this._toggle) {
      if (this._isActive) {
        this.hide();
      } else if (this._el !== document.activeElement) {
        this._el.focus();
      } else {
        this.toggle();
      }
    } else if (e.target === this._list || e.target.parentNode === this._list) {
      this.hide();
      if (onSelect) onSelect(this, parseInt(e.target.getAttribute('data-index')), e.target.innerText);
    }

    clicking = false;
  });

  dropdowns.push(this);
}

Dropdown.prototype = Object.assign(Dropdown.prototype, {
  hide() {
    if (!this._isActive) return;
    utils.removeClass(this._el, this._activeClass);
    this._isActive = false;
  },
  show() {
    if (this._isActive) return;
    utils.addClass(this._el, this._activeClass);
    updateDropdownPosition(this);
    this._isActive = true;
  },
  toggle() {
    this._isActive = !this._isActive;
    utils.toggleClass(this._el, this._activeClass, this._isActive);
    if (this._isActive) updateDropdownPosition(this);
  },
  focus() {
    this.show();
    this._isFocused = true;
  },
  blur() {
    this.hide();
    this._isFocused = false;
  },
  getElement() {
    return this._el;
  }
});

window.addEventListener('scroll', delayedUpdatePosition());
window.addEventListener('resize', delayedUpdatePosition());

function delayedUpdatePosition() {
  let to = undefined;
  let activeDD = null;

  return function() {
    if (!activeDD) {
     activeDD = getActiveDropdown();
    }

    if (activeDD) {
      activeDD.hide();

      clearTimeout(to);

      to = setTimeout(() => {
        activeDD.show();
        activeDD = null;
      }, 200);
    }
  }
}

function getActiveDropdown() {
  return dropdowns.find(dd => dd._isActive);
}

function updateDropdownPosition(dropdown) {
  const list = dropdown._el.getElementsByClassName('dropdown__list')[0];
  const { top, left, height } = dropdown._el.getBoundingClientRect();

  const listHeight = list.clientHeight;
  const offset = 5;

  let listTop;

  if (top - listHeight > 0) {
    listTop = top - listHeight - offset;
  } else {
    listTop = top + height + offset;
  }

  list.style.top = listTop + 'px';
  list.style.left = left + 'px';
}

export default Dropdown;
