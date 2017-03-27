require('jquery-hammerjs');
require('./canvasloader');

let hammerJQuery = require('../../../../../../../node_modules/jquery-hammerjs/node_modules/jquery');

/*
 -- Frame Box Lite --
 Version: 0.2.1
 Author: Steph.L
 */
;(function ($, window, undefined) {

  var frameBox = 'frameBox',
    document = window.document,
    defaults = { //options par dÃ©faut

      general: {
        overSizing: false,
        title: true,
        desc: true,
        place: true,
        credits: true,
        download: true,
        touchGestures: true
      },

      blockOption: {
        close: true,
        fullscreen: false
      },

      frameboxLoader: {
        color: '#0086BA',
        diameter: 40
      }

    },
    detachedElement = new Object();

  let cl = null;

  function frameBoxConstructor(element, o) {
    var $this = this;

    this.element = element;

    //On fusionne les options
    this.o = $.extend(true, {}, defaults, o);

    this._defaults = defaults;
    this._name = frameBox;

    //On initialise la frameBox
    this.init($this);

    //Empechage de selection
    $(this.element).css({
      '-webkit-touch-callout': 'none',
      '-webkit-user-select': 'none',
      '-khtml-user-select': 'none',
      '-moz-user-select': 'none',
      '-ms-user-select': 'none',
      'user-select': 'none',
      'cursor': 'pointer'
    });
  }

  frameBoxConstructor.prototype.init = function ($this) {

    var $thisElement = $(this.element),
      $frameBoxContent,
      dataFbGroup = $thisElement.data('fbGroup'),
      myVideoLoader;

    var img = $thisElement.find('img').first();
    var imgParent = img.parent();

    imgParent.css('background-image', 'url("' + img.prop('src') + '")');

    //Init group
    if (dataFbGroup) {
      var thisElemNumber = $('body *[data-fb-group="' + dataFbGroup + '"]').index($thisElement);//Index de l'Ã©lÃ©ment par rapport Ã  ceux appartenant au mÃªme groupe
      $thisElement.data('fbGroupNumber', thisElemNumber);//On stock cet index dans un data sur l'Ã©lÃ©ment en lui mÃªme
    }

    $thisElement.on('click', function (e) {
      e.preventDefault();
      //CrÃ©ation de la frameBox si elle n'existe pas
      if ($('.frameBoxWrapper').length == 0) {
        createFrameBox();
        //CrÃ©ation des options de la framebox
        createOptionFrameBox();
      } //Si elle existe on la met Ã  jour
      else {
        updateFrameBox();
        updateoptionFrameBox();
      }
      //Si groupe on active la navigation
      if (dataFbGroup) {
        setFrameBoxNavigation(dataFbGroup);
      }

      //On fait apparaitre la framebox
      showFrameBox();
      //On charge et on ajoute le contenu de la framebox en fonction de son type
      if (dataFbGroup) {
        if (detachedElement[dataFbGroup + thisElemNumber]) {
          detachedElement[dataFbGroup + thisElemNumber].appendTo($frameBoxContent);
          resizeAndReplace(detachedElement[dataFbGroup + thisElemNumber], $frameBoxContent);
        }
        else {
          checkLoader($(this));
        }
      }
      else {
        checkLoader($(this));
      }
    });

    //Construction de la frameBox
    function createFrameBox() {
      $('html,body').css('overflow', 'auto');
      //CrÃ©ation des Ã©lÃ©ments html constituant la structure de la framebox
      var frameBoxWrapper = createElement('div', 'frameBoxWrapper'),
        frameBoxBackground = createElement('div', 'frameBoxBackground'),
        frameBoxContent = createElement('div', 'frameBoxContent'),
        frameBoxBar = createElement('div', 'frameBoxBar'),
        scrollLeft = $(window).scrollLeft(),
        scrollTop = $(window).scrollTop();

      frameBoxWrapper.attr('id', 'frameBoxWrapper');
      //CanvasLoader
      var frameboxLoader = createElement('div', 'frameboxLoader');
      frameboxLoader.attr('id', 'frameboxLoader')
        .appendTo(frameBoxWrapper);

      //On associe au background de la framebox l'action au click : fermer la frameBox.
      frameBoxBackground.on('click', hideFrameBox)
        .appendTo(frameBoxWrapper);

      frameBoxContent.appendTo(frameBoxWrapper);

      frameBoxBar.appendTo(frameBoxWrapper);

      frameBoxWrapper.css({
        '-webkit-touch-callout': 'none',
        '-webkit-user-select': 'none',
        '-khtml-user-select': 'none',
        '-moz-user-select': 'none',
        '-ms-user-select': 'none',
        'user-select': 'none',
        'display': 'none',
        'top': 0,
        'left': 0,
        'overflow': 'hidden'
      })
        .addClass('off') //Par dÃ©faut la framebox est set Ã  off via cette class
        .appendTo('body');

      $frameBoxContent = $('.frameBoxContent');

      updateFrameBox();

      //instanciation du loader
      cl = new CanvasLoader('frameboxLoader');
      //CL Options
      cl.setColor($this.o.frameboxLoader.color);
      cl.setDiameter($this.o.frameboxLoader.diameter);
    }

    //Construction des options de la frameBox
    function createOptionFrameBox() {
      if ($this.o.blockOption.close || $this.o.blockOption.fullscreen) {
        var blockOptions = createElement('div', 'blockOptions');//container des options
        //Close
        if ($this.o.blockOption.close) {
          var optionClose = createElement('span', 'optionClose');

          optionClose.appendTo(blockOptions)
            .on("click", hideFrameBox);//On associe le bouton Ã  son action
        }
        //Fullscreen
        if ($this.o.blockOption.fullscreen) {
          $('.frameBoxWrapper').attr('id', 'frameBoxWrapper');
          var frameBoxWrapper = document.getElementById('frameBoxWrapper');
          //On affiche le bouton uniquement si le navigateur accepte ce mode (HTML5 feature)
          if (frameBoxWrapper.requestFullScreen || frameBoxWrapper.webkitRequestFullScreen || frameBoxWrapper.mozRequestFullScreen) {
            var optionFullscreen = createElement('span', 'optionFullscreen');

            optionFullscreen.appendTo(blockOptions)
              .on("click", function () {//On associe le bouton Ã  son action
                enterFullscreen(frameBoxWrapper);
              });
          }
        }
        //On insert les options dans le dom au sein de leur Ã©lÃ©ment dÃ©idiÃ©
        blockOptions.appendTo('.frameBoxBar');
      }
    }

    //Touch event
    function initTouchGestures(frameBoxWrapper, frameBoxContent) {
      frameBoxWrapper.hammer({swipe: false, tap: false})
        .on("drag", function (ev) {
          var swipeMargin = 0;
          if (ev.gesture.direction == 'right') {
            swipeMargin = ev.gesture.distance;
          } else if (ev.gesture.direction == 'left') {
            swipeMargin = 0 - ev.gesture.distance;
          }
          frameBoxContent.css({'marginLeft': swipeMargin});
        })
        .on("dragend", function (ev) {
          frameBoxContent.css({'marginLeft': '0'});
          if (ev.gesture.direction == 'right') {
            goToElem(dataFbGroup, -1);
          } else if (ev.gesture.direction == 'left') {
            goToElem(dataFbGroup, 1);
          }
        });
    }

    //Request Fullscreen
    function enterFullscreen(frameBoxWrapper) {
      if (frameBoxWrapper.requestFullScreen) {//fonction native
        frameBoxWrapper.requestFullScreen();
      }
      else if (frameBoxWrapper.webkitRequestFullScreen) {//webkit
        frameBoxWrapper.webkitRequestFullScreen(frameBoxWrapper.ALLOW_KEYBOARD_INPUT);
      }
      else if (frameBoxWrapper.mozRequestFullScreen) { //gecko
        frameBoxWrapper.mozRequestFullScreen();
      }
      else {//others (ie...)
        alert('Votre navigateur ne supporte pas le mode plein $eamp;cran.');
      }
      if (frameBoxWrapper.requestFullScreen || frameBoxWrapper.webkitRequestFullScreen || frameBoxWrapper.mozRequestFullScreen) {
        var $blockOptions = $('.frameBoxWrapper').find('.blockOptions'),
          scrollToTop = $(frameBoxWrapper).css('top');
        $blockOptions.fadeOut(500);//on n'affiche plus les options
        $(frameBoxWrapper).css('top', '0');//On repositionne la framebox
        $('.frameBoxBackground').off('click'); //On dÃ©sactive le click sur le fond pour fermer la framebox en mode plein Ã©cran
        $(document).on('webkitfullscreenchange mozfullscreenchange fullscreenchange', function () {//On quitte le mode plein Ã©cran, on rÃ©active donc les options et on replace la framebox
          if (document.fullscreen === false || document.mozFullScreen === false || document.webkitIsFullScreen === false) {
            $(frameBoxWrapper).css('top', scrollToTop);
            $(window).scrollTop(scrollToTop.substring(0, scrollToTop.length - 2));
            $blockOptions.fadeIn(500);
            $('.frameBoxBackground').on('click', function () {
              hideFrameBox();
            });
          }
        });
      }
    }

    //Mise Ã  jour de la frameBox
    function updateFrameBox() {
      var scrollLeft = $(window).scrollLeft(),
        scrollTop = $(window).scrollTop();

      $('.frameBoxWrapper').css({
        'top': scrollTop,
        'left': scrollLeft
      });

      $frameBoxContent = $('.frameBoxContent');
    }

    //Mise Ã  jour des options
    function updateoptionFrameBox() {

    }

    //Navigation au sein d'un groupe
    function setFrameBoxNavigation(dataFbGroup) {
      //crÃ©ation des boutons de navigation
      var blockNav = createElement('div', 'blockNav'),
        btnNext = createElement('span', 'btnNext'),
        btnPrev = createElement('span', 'btnPrev');

      btnPrev.appendTo(blockNav)
        .on('click', function () {
          goToElem(dataFbGroup, -1);
        });
      btnNext.appendTo(blockNav)
        .on('click', function () {
          goToElem(dataFbGroup, 1);
        });
      blockNav.appendTo($('.frameBoxBar'));

      //Touch gestures
      if ($this.o.general.touchGestures) {
        initTouchGestures($('#frameBoxWrapper'), $frameBoxContent);
      }

      //Action sur la frameBox via touche clavier
      $(window).on('keydown', function (e) {
        if ($('.frameBoxWrapper').hasClass('on')) {
          e.preventDefault();
          switch (e.keyCode) {
            case 27: // echap
              hideFrameBox();
              break;
            case 37: // flÃ¨che gauche
              goToElem(dataFbGroup, -1);
              break;
            case 39: // flÃ¨che droite
              goToElem(dataFbGroup, 1);
              break;
          }
        }
      });
    }

    //Go to (flÃ¨ches de nav, flÃ¨ches clavier et touch gesture)
    function goToElem(groupName, direction) {
      var thisElemNumber = $frameBoxContent.children().data('fbGroupNumber'),//Index de l'Ã©lÃ©ment par rapport Ã  ceux appartenant au mÃªme groupe
        groupTotal = $('body *[data-fb-group="' + groupName + '"]'),//Tout les Ã©lÃ©ments du groupe
        groupTotalElem = groupTotal.length - 1,//Nombre total d'Ã©lÃ©ment dans le groupe
        nextElemNumber = thisElemNumber + direction;//l'Ã©lÃ©ment suivant Ã  afficher au sein du groupe
      let nextElem = groupTotal.eq(thisElemNumber + direction);//l'Ã©lÃ©ment suivant Ã  afficher au sein du groupe


      if (thisElemNumber + direction > groupTotalElem) {//Si on es sur le dernier Ã©lÃ©ment du groupe et direction == 1
        nextElem = groupTotal.eq(0);
        nextElemNumber = 0;
      }
      else if (thisElemNumber + direction < 0) {//Si on es sur le premier Ã©lÃ©ment du groupe et direction == -1
        nextElem = groupTotal.eq(groupTotalElem);
        nextElemNumber = groupTotalElem;
      }

      //On vide le contenu de la frameBox avant de charger le nouvel Ã©lÃ©ment dedans, et on reset la taille
      detachedElement[groupName + thisElemNumber] = $frameBoxContent.children().detach();
      $frameBoxContent.width('auto')
        .height('auto');

      //On charge le  nouvel Ã©lÃ©ment Ã  afficher
      if (detachedElement[groupName + nextElemNumber]) {
        detachedElement[groupName + nextElemNumber].appendTo($frameBoxContent);
        resizeAndReplace(detachedElement[groupName + nextElemNumber], $frameBoxContent);
      }
      else {
        checkLoader(nextElem);
      }
    }

    //Vidage de la frameBox
    function cleanFrameBox() {
      var lastThisElemNumber = $frameBoxContent.children().data('fbGroupNumber');
      $('#frameBoxWrapper').hammer().off('drag');
      $('#frameBoxWrapper').hammer().off('dragend');
      detachedElement[dataFbGroup + lastThisElemNumber] = $frameBoxContent.children().detach();

      $frameBoxContent.empty()
        .width('auto')
        .height('auto')
        .removeData('fbSize');
      $('.blockNav').empty().remove();
      $(window).off('keydown');

      //Event de fermeture de la framebox
      $thisElement.trigger('frameBoxClosed');
    }

    //RÃ©cupÃ©ration et insertion du contenu dans la frameBox
    //Image
    function loadImgToFrameBox(thisElem, dataFbImg, fbGroupNumber, secondLoad) {
      var newImg = createElement('img');
      if (secondLoad) { //second chargement
        dataFbImg = dataFbImg + '?' + (new Date()).getTime(); //On rajoute un paramÃ¨tre pour Ã©viter que le navigateur aille chercher l'image en cache
      }
      newImg.attr('src', dataFbImg)
        .data({
          'thisType': 'img',
          'fbGroupNumber': fbGroupNumber
        })
        .imagesLoaded({
          fail: function ($images, $proper, $broken) {
            if (!secondLoad) {
              newImg = null;
              loadImgToFrameBox(thisElem, dataFbImg, fbGroupNumber, true);//En cas d'Ã©chec on relance
            }
            else {
              hideFrameBox();//En cas de second Ã©chec on ferme la framebox
            }
          },
          done: function ($images) {
            newImg.appendTo('.frameBoxContent')
              .on("dragstart", function () {
                return false;
              });
            $frameBoxContent.css('overflow', 'hidden');
            resizeAndReplace(thisElem, $frameBoxContent);
            if ($this.o.general.title) {
              addInfos(thisElem, 'title');
            }
            if ($this.o.general.desc) {
              addInfos(thisElem, 'desc');
            }
            if ($this.o.general.credits) {
              addInfos(thisElem, 'Credits');
            }
            if ($this.o.general.place) {
              addInfos(thisElem, 'Place');
            }
            if ($this.o.general.download) {
              addInfos(thisElem, 'Download');
            }
          }
        });
    }

    //fonction globale / type de fichier
    function checkLoader(thisElem) {
      //On affiche le loader
      cl.show();

      var img = thisElem.find('img').first();
      var dataFbSrc = img.prop('src');

      var fbGroupNumber = thisElem.data('fbGroupNumber');

      if (dataFbSrc) {
        loadImgToFrameBox(thisElem, dataFbSrc, fbGroupNumber);
      }
    }

    //resize & position frameBoxContent
    function resizeAndReplace(thisElem, loadElem) {
      if (thisElem.data('fbSize')) {
        var dataFbMaxSize = (thisElem.data('fbSize')).split(/,/);
        loadElem.data('fbSize', thisElem.data('fbSize'));
        resizeFrameBoxContent(dataFbMaxSize[0], dataFbMaxSize[1]);
      }
      else {
        resizeFrameBoxContent();
      }
      //On positionne le contenu de la frameBox
      setFrameBoxContentPosition();
    }

    //Resize
    function resizeFrameBoxContent(maxWuser, maxHuser) {
      var $frameBoxContentR = $('.frameBoxContent'),
        windowWidth = $(window).width(),
        windowHeight = $(window).height(),
        currW = $frameBoxContentR.outerWidth(),
        currH = $frameBoxContentR.outerHeight();

      if (!$this.o.general.overSizing) {
        //On rÃ©cupÃ¨re la taille original de l'image
        if ($('.frameBoxContent img').length == 1) {
          var img_tmp = new Image();
          img_tmp.src = $('.frameBoxContent img').attr('src');
          currW = img_tmp.width;
          currH = img_tmp.height;
        }
        //On rÃ©cupÃ¨re la taille original de la video
        else if ($('.frameBoxContent video').length == 1) {
          var dataFbMaxSize = $frameBoxContentR.data('fbSize');
          currW = dataFbMaxSize[0];
          currH = dataFbMaxSize[1];
        }
      }

      if (windowWidth > 480) {
        var globalMargin = 50;
      }
      else {
        var globalMargin = 0;
      }

      if (maxWuser && maxHuser) {
        if (maxWuser > windowWidth - globalMargin || maxHuser > windowHeight - globalMargin) {
          var maxW = windowWidth - globalMargin,
            maxH = windowHeight - globalMargin,
            ratio = Math.min(maxW / currW, maxH / currH),
            newW = Math.ceil(currW * ratio),
            newH = Math.ceil(currH * ratio);
        }
        else {
          if (maxWuser == 0) {
            var maxW = windowWidth - globalMargin;
          }
          else {
            var maxW = maxWuser;
          }
          if (maxHuser == 0) {
            var maxH = windowHeight - globalMargin;
          }
          else {
            var maxH = maxHuser;
          }
          //
          var ratio = Math.min(maxW / currW, maxH / currH);
          if (maxWuser != 0) {
            var newW = maxW;
          }
          else {
            var newW = Math.ceil(currW * ratio);
          }
          if (maxHuser != 0) {
            var newH = maxH;
          }
          else {
            var newH = Math.ceil(currH * ratio);
          }
        }
      }
      else {
        var maxW = windowWidth - globalMargin,
          maxH = windowHeight - globalMargin,
          ratio = Math.min(maxW / currW, maxH / currH),
          newW = Math.ceil(currW * ratio),
          newH = Math.ceil(currH * ratio);
        if (!$this.o.general.overSizing) {
          if (newW > currW || newH > currH) {
            newW = currW,
              newH = currH;
          }
        }
      }

      $frameBoxContentR.width(newW)
        .height(newH)
        .children().not('.frameBoxContentInfos').width('100%')
        .height('100%');

      if ($frameBoxContentR.children('.iframeContainer')) {
        $frameBoxContentR.find('.iframeContainer #fbIframe').attr({
          'width': '100%',
          'height': '100%'
        });
      }
    }

    //Ajout title + description pour une image
    function addInfos(thisElem, type) {
      var title = $.trim(thisElem.data('fbTitle')),
        desc = $.trim(thisElem.data('fbDesc')),
        dl = $.trim(thisElem.data('fbDownload')),
        fbType = $.trim(thisElem.data('fb' + type)),
        frameBoxContentInfos;

      if ($('.frameBoxContentInfos').length == 0) {
        frameBoxContentInfos = createElement('div', 'frameBoxContentInfos');
      }
      else {
        frameBoxContentInfos = $('.frameBoxContentInfos');
      }

      if (title.length > 0 && type == 'title') {
        var $title = (createElement('h2', 'fbTitle')).text(title);
        frameBoxContentInfos.append($title);
      }
      else if (dl.length > 0 && type == 'Download') {
        var $dl = (createElement('p', 'fbDownload')).text(dl);
        frameBoxContentInfos.append($dl);
      }
      else if (fbType != "") {
        var fbType = $.trim(thisElem.data('fb' + type)),
          $type = (createElement('p', 'fb' + type)).text(fbType)
        frameBoxContentInfos.append($type);
      }

      if (desc.length > 0 && type == 'desc') {
        var $desc = (createElement('p', 'fbDesc')).text(desc);
        frameBoxContentInfos.append($desc);
      }

      if (dl.length > 0 || title.length > 0 || fbType != "") {
        frameBoxContentInfos.appendTo($frameBoxContent);
      }
    }

    //recentrage du contenu de la framebox
    function setFrameBoxContentPosition() {
      var $frameBoxContentS = $('.frameBoxContent'),
        contentWidth = $frameBoxContentS.width(),
        contentHeight = $frameBoxContentS.height(),
        newContentMarginLeft = Math.round(($(window).width() - contentWidth) / 2),
        newContentMarginTop = Math.round(($(window).height() - contentHeight) / 2);

      $frameBoxContentS.css({
        'top': newContentMarginTop,
        'left': newContentMarginLeft
      });

      //on masque le loader
      cl.hide();
    }

    //Apparition de la frameBox
    function showFrameBox() {
      $('html,body').css('overflow', 'hidden');
      $('.frameBoxWrapper').fadeIn(250, function () {
        $(this).removeClass('off').addClass('on');
        $thisElement.trigger('frameBoxOpen');
      });
    }

    //Disparition de la frameBox
    function hideFrameBox() {
      $('.frameBoxWrapper').removeClass('on').addClass('off')
        .fadeOut(250, function () {
          $('html,body').css('overflow', 'auto');
          cleanFrameBox();
        });
    }


    //Resize on repositionne / redimensionne
    var currentHeight = $(window).height();
    var currentWidth = $(window).width();

    $(window).on('resize', function (event) {
      if ($('.frameBoxWrapper').hasClass('on')) {
        var windowHeight = $(window).height(),
          $frameBoxContentW = $('.frameBoxContent'),
          windowWidth = $(window).width();

        if (currentHeight == undefined || currentHeight != windowHeight || currentWidth == undefined || currentWidth != windowWidth) {

          if ($frameBoxContentW.data('fbSize')) {
            var dataFbMaxSize = $frameBoxContentW.data('fbSize');
            resizeFrameBoxContent(dataFbMaxSize[0], dataFbMaxSize[1]);
          }
          else {
            resizeFrameBoxContent();
          }
          setFrameBoxContentPosition();

          currentHeight = windowHeight;
          currentWidth = windowWidth;
        }
      }
    });

    //////////OUTILS//////////
    //CreateElement
    function createElement(elemType, elemName) {
      var newElem = document.createElement(elemType);

      if (elemName) {
        $(newElem).addClass(elemName);
      }

      return $(newElem);
    }

  };

  $.fn[frameBox] = function (o) {
    return this.each(function () {
      if (!$.data(this, 'plugin_' + frameBox)) {
        $.data(this, 'plugin_' + frameBox, new frameBoxConstructor(this, o));
      }
    });
  }

}(hammerJQuery, window));

//ImgLoader
(function (c, n) {
  var l = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
  c.fn.imagesLoaded = function (f) {
    function m() {
      var b = c(i), a = c(h);
      d && (h.length ? d.reject(e, b, a) : d.resolve(e));
      c.isFunction(f) && f.call(g, e, b, a)
    }

    function j(b, a) {
      b.src === l || -1 !== c.inArray(b, k) || (k.push(b), a ? h.push(b) : i.push(b), c.data(b, "imagesLoaded", {
        isBroken: a,
        src: b.src
      }), o && d.notifyWith(c(b), [a, e, c(i), c(h)]), e.length === k.length && (setTimeout(m), e.unbind(".imagesLoaded")))
    }

    var g = this, d = c.isFunction(c.Deferred) ? c.Deferred() :
      0, o = c.isFunction(d.notify), e = g.find("img").add(g.filter("img")), k = [], i = [], h = [];
    c.isPlainObject(f) && c.each(f, function (b, a) {
      if ("callback" === b) f = a; else if (d) d[b](a)
    });
    e.length ? e.bind("load.imagesLoaded error.imagesLoaded", function (b) {
        j(b.target, "error" === b.type)
      }).each(function (b, a) {
        var d = a.src, e = c.data(a, "imagesLoaded");
        if (e && e.src === d) j(a, e.isBroken); else if (a.complete && a.naturalWidth !== n) j(a, 0 === a.naturalWidth || 0 === a.naturalHeight); else if (a.readyState || a.complete) a.src = l, a.src = d
      }) : m();
    return d ? d.promise(g) :
      g
  }
})(hammerJQuery);

module.exports = hammerJQuery;