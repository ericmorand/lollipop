const riot = require('riot');

riot.tag('raw', '<div></div>', function(opts) {
  this.shouldUpdate = function(data, opts) {
    console.log('data', data);
    console.log('opts', opts);

    return true;
  };

  this.on('update', function() {
    console.log('UPDATE', opts);

    this.root.innerHTML = opts.content;
  });
});

module.exports = {};