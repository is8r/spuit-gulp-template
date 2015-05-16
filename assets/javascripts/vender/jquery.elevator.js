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
      marginTop: 0
    }, options);

    //init
    self.on('elevator:init', function(e) {
      $(window).on('scroll', _.throttle(function(event) {
        self.trigger('elevator:scroll', event);
      }, 30));
    });

    self.on('elevator:scroll', function(e) {
      if(!$self.hasClass('is-fixed')) {
        if(Static.getScroll().y > settings.marginTop) {
          $self.addClass('is-fixed');
          $self.css({
            'position': 'fixed',
            'top': settings.marginTop+'px'
          });
        }
      } else {
        if(Static.getScroll().y < settings.marginTop) {
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
