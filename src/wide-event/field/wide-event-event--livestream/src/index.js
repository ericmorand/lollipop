document.addEventListener('DOMContentLoaded', function(event) {
  let anchors = document.querySelectorAll('.field--wide-event-event--livestream > a');

  anchors.forEach(function(anchor) {
    anchor.setAttribute('target', '_blank');
  });
});

module.exports = {};