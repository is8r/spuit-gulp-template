/*
 *  Project:
 *  Description:
 *  Author:
 *  License:
 *  Example:

$(function () {
  $('.js-elevator').elevator();
})

 */

;(function($) {
  'use strict';

  var PLUGIN_NAME = 'elevator';

  $.fn[PLUGIN_NAME] = function(options) {
    var self = this;
    var $self = $(self);
    if (self.length > 1) {
      return self.each(function () {
        $(this)[PLUGIN_NAME](options);
      });
    }

    var settings = $.extend({
      posY: 0,
      marginTop: 0
    }, options);

    //init
    self.on('elevator:init', function(e) {
      $(window).on('scroll', _.throttle(function(event) {
        self.trigger('elevator:scroll', event);
      }, 30));
    });

    self.on('elevator:scroll', function(e) {
      if(settings.posY == 0) {
        settings.posY = $self.offset().top - settings.marginTop;
      }
      if(!$self.hasClass('is-fixed')) {
        if(Util.getScroll().y > settings.posY) {
          $self.addClass('is-fixed');
          $self.css({
            'position': 'fixed',
            'top': settings.marginTop+'px'
          });
        }
      } else {
        if(Util.getScroll().y < settings.posY) {
          $self.removeClass('is-fixed');
          $self.css({
            'position': 'relative',
            'top': 'auto'
          });
        }
      }
    });

    self.trigger('elevator:init');
    return self;
  };

})(jQuery);
