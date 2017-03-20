require('../../twitter-status');

const riot = require('riot');

let tag = riot.tag('field--wide-event-event--livestream', require('./templates/livestream.html'), function(opts) {
  let self = this;

  this.hashtag = opts.hashtag;
  this.interval = 10;
  this.status = null;

  this.refresh = function() {
    self.status = null;

    let http = require('http');

    let options = {
      host: 'drupal-8.local',
      port: '80',
      path: '/wide_storify/story/get/%23' + that.hashtag,
      method: 'GET'
    };

    let data = '';

    let req = http.request(options, function (res) {
      res.on('data', function (d) {
        data += d;
      });

      res.on('end', function () {
        self.status = JSON.parse(data).statuses.shift();

        self.update();
      });
    });

    req.end();
  };

  this.on('mount', function() {
    this.refresh();
  })
});

riot.mount('field--wide-event-event--livestream');

module.exports = tag;