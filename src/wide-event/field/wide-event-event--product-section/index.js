let $ = require('jquery');
let debounce = require('debounce');

window.tagHeuer = window.tagHeuer || {};
tagHeuer.shared = tagHeuer.shared || {};

tagHeuer.shared.stickyheader = (function (utils) {

  let elements = {
    $stickyNav: $("#sticky-nav"),
    $header: $("#main-header"),
    $progressBarWrapper: $("#progressBarWrapper"),
    $progressBar: $("#progressBar"),
    $menuItem: $(".menuItem"),
    $block: $(".block"),
    menuAnchor: [],
    paddingBlock: 0,
    throttle: 250,
    $titleTag: $('.title-tag')
  };

  function init(options) {
    var self = this;

    if (options) {
      // Extend Object if options
      /*
       $stickyNav,
       $header,
       $progressBarWrapper,
       $progressBar,
       $menuItem ,
       $block,
       menuAnchor
       */
      $.extend(elements, options.elements);
    }

    //
    elements.$stickyNavPositionTop = elements.$stickyNav.position().top;
    elements.menuAnchor = initAnchorArray($(elements.$menuItem));


    //Init EventBinding
    initEventBinding(elements, self);
  };

// initEventBinding
  function initEventBinding(elements, scope) {

    $(elements.$stickyNav)
      .find('li a[href*="#"]')
      .on('click', function (event) {
        event.preventDefault();
        var anchor = event.currentTarget.hash;
        scope.scrolltoAnchor(anchor);

      });

    window.addEventListener(
      'scroll',
      debounce(
        function () {
          scope.windowEvent(elements)
        }, elements.throttle)
    );

    window.addEventListener(
      'resize',
      debounce(
        function () {
          scope.windowEvent(elements)
        }, elements.throttle)
    )
  }

// initAnchorArray
  function initAnchorArray(navitem) {
    var navitemlength = navitem.length,
      anchorArray = [];

    for (var i = 0; i < navitemlength; i++) {
      anchorArray.push(
        $(navitem[i])
          .find('a')
          .attr('href')
      )
    }

    return anchorArray;
  }


// windowEvent
  function windowEvent(elements) {

    var self = this,
      i = 0,
      // constant is used to centered the progressBar with the menuItem 8could be improved)
      constant = 30,
      query = document.querySelector.bind(document),
      sizeWindow = $(document).width();
    let progressBarWidth = 0,
      anchor = null,
      firstBlock = elements.$block.first(),
      firstBlockPositionTop = firstBlock.position().top,
      paddingBlock = elements.paddingBlock,
      navbarHeight = elements.$header ? elements.$header.outerHeight(true) : 0,
      // We add 2pixels to make sure it doesn't break in IE
      gapIE = 0,
      gapFromTheTop = paddingBlock + navbarHeight + gapIE;

    self.removeMyClass(elements.$block, ".title-tag", "mobile-hidden");
    self.removeMyClass(elements.$block, "h2", "is_stuck");


    if (window.pageYOffset === 0) {
      progressBarWidth = 0;
      self.changeClass({
        state: 0,
        elements: elements
      });
    }

    if (window.pageYOffset < (firstBlockPositionTop - gapIE) && window.pageYOffset != 0) {
      progressBarWidth = constant;
      self.changeClass({
        state: 0,
        elements: elements
      });
    }


    // Check for each elements when scrolling
    elements.menuAnchor.forEach(function (elts) {
      if (window.pageYOffset >= ($(query(elts)).position().top - gapFromTheTop)) {
        var position_Left = elements.$stickyNav.find('li a[href="' + elts + '"]').position().left;
        progressBarWidth = position_Left + constant;
        anchor = i;

        self.changeClass({
          state: 1,
          elements: elements
        });
      }
      i++;
    });

    //Change class menuItem
    self.removeMyClass(elements.$menuItem, "a", "active-section");


    //anchor can be 0
    if (anchor != null) {
      $(elements.$menuItem[anchor]).find('a').addClass("active-section");
      $(elements.$block[anchor]).find('h2').addClass("is_stuck");
      $(elements.$titleTag[anchor]).addClass("mobile-hidden");

    }

    // Progress Bar
    elements.$progressBar.width((progressBarWidth * 100 / sizeWindow) + "%");
  }

// Remove specific className
  function removeMyClass(elements, target, className) {
    $(elements).each(function () {
      $(this).find(target).removeClass(className);
    });

  }


//Change sticky header class
  function changeClass(options) {
    switch (options.state) {
      case 0:
        options.elements.$stickyNav.removeClass('sticky');
        options.elements.$stickyNav.addClass('unsticky');
        break;
      case 1:
        options.elements.$stickyNav.removeClass('unsticky');
        options.elements.$stickyNav.addClass('sticky');
        break;

    }


  }

// ScrolltoAnchor
  function scrolltoAnchor(anchor) {
    // Add the block padding and the navBarHeight
    var target = $(anchor),
      navbarHeight = elements.$header ? elements.$header.outerHeight(true) : 0,
      paddingBlock = elements.paddingBlock,
      gapFromTheTop = paddingBlock + navbarHeight,
      target_top = target.offset().top - gapFromTheTop;

    $("body, html").animate({
      scrollTop: target_top
    }, 'slow');


  }

  return {
    init: init,
    scrolltoAnchor: scrolltoAnchor,
    changeClass: changeClass,
    windowEvent: windowEvent,
    initAnchorArray: initAnchorArray,
    removeMyClass: removeMyClass
  }

})();

$(function () {
  tagHeuer.shared.stickyheader.init({
    elements: {
      $stickyNav: $(".field--wide-event-event--product-section > .section-links"),
      $header: null,
      $progressBarWrapper: $(".field--wide-event-event--product-section > .section-links > .progress-bar-wrapper"),
      $progressBar: $(".field--wide-event-event--product-section > .section-links > .progress-bar-wrapper > .progress-bar"),
    }
  });
});

module.exports = {};