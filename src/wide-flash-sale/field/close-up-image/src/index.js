let $ = require('./assets/scripts/framebox.lite');

document.addEventListener('DOMContentLoaded', function() {
  /***** FrameBox *****/
  let frameBox = $('.closeup-watch-wrapper').frameBox({
    frameBoxLoader: {
      color: '#736359'
    }
  });
}, false);

module.exports = {};