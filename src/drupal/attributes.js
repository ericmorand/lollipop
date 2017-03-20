class Attributes extends Map {
  constructor(it) {
    super(it);

    this.id = this.has('id') ? this.get('id').join(' ') : null;
  }

  addClass(data) {
    if (!Array.isArray(data)) {
      data = [data];
    }

    if (!this.has('class')) {
      this.set('class', []);
    }

    let classes = this.get('class');

    data.forEach(function(d) {
      if (classes.indexOf(d) < 0) {
        classes.push(d);
      }
    });

    return this;
  }

  setAttribute(attribute, value) {
    this.set(attribute, [value]);

    return this;
  }

  toString() {
    let result = '';

    this.forEach(function(value, key) {
      result += ' ' + key + '="' + value.join(' ') + '"'
    });

    return result;
  }
}

module.exports = Attributes;