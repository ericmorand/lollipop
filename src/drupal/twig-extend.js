const Attributes = require('drupal-attribute');

module.exports = function (twig) {
  // trans
  twig.extend(function (Twig) {
    Twig.exports.extendTag({
      type: 'trans',
      regex: /^trans$/,
      next: ['endtrans'],
      open: true,
      parse: function (token, context, chain) {
        let output = Twig.parse.apply(this, [token.output, context]);

        return {
          chain: chain,
          output: output
        };
      }
    });

    Twig.exports.extendTag({
      type: 'endtrans',
      regex: /^endtrans$/,
      next: [],
      open: false
    });
  });

  twig.extendFunction('check_commerce', function (data) {
    return true;
  });

  twig.extendFunction('link', function (title, url, attributes) {
    if (attributes) {
      let it = [];

      for (let key of attributes._keys) {
        let value = attributes[key];
        let itValue = [];

        itValue.push(key);
        itValue.push([value]);

        it.push(itValue);
      }

      attributes = new Attributes(it);
    }

    return '<a href="' + url + '"' + (attributes ? attributes : null) + '>' + title + '</a>';
  });

  twig.extendFunction("url", function (data) {
    return data;
  });

  twig.extendFunction("file_url", function (data) {
    return 'http://' + data;
  });

  twig.extendFunction("translate", function (data) {
    return data.toUpperCase();
  });

  twig.extendFilter("render", function (data) {
    return 'render';
  });

  twig.extendFilter("clean_class", function (data) {
    return data;
  });

  twig.extendFilter("clean_id", function (data) {
    return data;
  });

  twig.extendFilter("trans", function (data) {
    return data;
  });

  twig.extendFilter("t", function (data) {
    return data;
  });
};