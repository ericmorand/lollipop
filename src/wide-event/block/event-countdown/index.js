let jQuery = require('jquery');

;(function ( $, window, undefined ) {
  let moment = require('moment');

  var baselCounter = 'baselCounter',
    defaults = {

    };

  function myBaselCounter(element, o) {
    var $this = this;

    this.element = element;

    this.o = $.extend(true, {}, defaults, o) ;

    this._defaults = defaults;
    this._name = baselCounter;

    this.init($this);

    $(this.element).css({
      '-webkit-touch-callout': 'none',
      '-webkit-user-select': 'none',
      '-khtml-user-select': 'none',
      '-moz-user-select': 'none',
      '-ms-user-select': 'none',
      'user-select': 'none',
      'cursor': 'default'
    });
  }

  myBaselCounter.prototype.init = function($this) {
    var $thisEl = $(this.element),
      startDate = $thisEl.data('startDate'),
      endDate = $thisEl.data('endDate'),
      currentDate = ($thisEl.data('currentDate')) ? $thisEl.data('currentDate') : moment().unix() * 1000;

    var $days = $thisEl.find('.days .nmbr'),
      $hours = $thisEl.find('.hours .nmbr'),
      $mins = $thisEl.find('.mins .nmbr'),
      $secs = $thisEl.find('.secs .nmbr');
    var $allNmbr = $thisEl.find('.nmbr');

    var diffTime = endDate - currentDate;
    var duration = moment.duration(diffTime, 'milliseconds');
    var interval = 1000;

    var durationDays = null;
    var durationHours = null;
    var durationMins = null;
    var durationSecs = null;

    var $wrapperNmbr = $('<div>').addClass('wrapper-nmbr');
    var $number = $('<span>').addClass('number');

    $allNmbr.each(function() {
      var $this = $(this);
      $this.append($wrapperNmbr.clone().addClass('first'));
      $this.append($wrapperNmbr.clone().addClass('last'));
    });

    function setDuration(el, duration) {
      var duration01 = duration.toString().substring(0,1);
      var duration02 = duration.toString().substring(1,2);

      el.find('.first .off').empty().remove();
      el.find('.last .off').empty().remove();

      if(duration01 !== el.find('.first .on').text()) {
        el.find('.first').prepend($number.clone().text(duration01));

        setTimeout(function() {
          el.find('.first .on').removeClass('on').addClass('off');
          el.find('.first .number').not('.on, .off').addClass('on');
        }, 450);
      }

      if(duration02 !== el.find('.last .on').text()) {
        el.find('.last').prepend($number.clone().text(duration02));

        setTimeout(function() {
          el.find('.last .on').removeClass('on').addClass('off');
          el.find('.last .number').not('.on, .off').addClass('on');
        }, 450);
      }
    }

    var CountInterval = setInterval(function(){
      duration = moment.duration(duration - interval, 'milliseconds');

      if(duration.seconds() < 0) {
        duration = moment.duration(0, 'milliseconds');
        clearInterval(CountInterval);
      }

      if(duration.days() != durationDays) {
        durationDays = duration.days();
        if(durationDays.toString().length === 1) durationDays = '0' + durationDays;
        setDuration($days, durationDays);
      }
      if(duration.hours() != durationHours) {
        durationHours = duration.hours();
        if(durationHours.toString().length === 1) durationHours = '0' + durationHours;
        setDuration($hours, durationHours);
      }
      if(duration.minutes() != durationMins) {
        durationMins = duration.minutes();
        if(durationMins.toString().length === 1) durationMins = '0' + durationMins;
        setDuration($mins, durationMins);
      }
      if(duration.seconds() != durationSecs) {
        durationSecs = duration.seconds();
        if(durationSecs.toString().length === 1) durationSecs = '0' + durationSecs;
        setDuration($secs, durationSecs);
      }
    }, interval);
  }

  $.fn[baselCounter] = function ( o ) {
    return this.each(function () {
      if (!$.data(this, 'header_' + baselCounter)) {
        $.data(this, 'header_' + baselCounter, new myBaselCounter( this, o ));
      }
    });
  }

  $(function() {
    $('.baselCount').baselCounter();
  });
}(jQuery, window));

const App = require('./js/src/App2');

jQuery(function() {
  new App();
});

module.exports = {};