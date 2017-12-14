const utils = {
  removeClass(el, className) {
    const i = el.className.indexOf(className);

    if (i === -1) return;

    const elClass = el.className.split('');
    const l = className.length;

    if (
      (elClass[i - 1] === " " || !Boolean(elClass[i - 1])) &&
      (elClass[i + l] === " " || !Boolean(elClass[i + l]))
    ) {
      el.className = [].concat(
        elClass.slice(0, i),
        elClass.slice(i + l)
      ).join('').trim().split(' ').filter(Boolean).join(' ');
    }
  },
  addClass(el, className) {
    const noClass = el.className.indexOf(className) === -1;
    if (noClass) el.className += ' ' + className;
  },
  toggleClass(el, className, state) {
    state ? this.addClass(el, className) : this.removeClass(el, className);
  }
};

export default utils;
