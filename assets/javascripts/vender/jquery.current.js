/*
 *  Project:
 *  Description:
 *  Author:
 *  License:
 *  Example:

$(function () {
  $('.js-current-topbar').current();
  $('.js-current-sidebar').current({isScroll: true, marginTop: 30});
})

 */

;(function($) {
  'use strict';

  var PLUGIN_NAME = 'current';

  $.fn[PLUGIN_NAME] = function(options) {
    var self = this;
    var $self = $(self);
    if (self.length > 1) {
      return self.each(function () {
        $(this)[PLUGIN_NAME](options);
      });
    }

    var settings = $.extend({
      isScroll: false,
      marginTop: 0,
      hrefs: []
    }, options);

    //init
    self.on('current:init', function(e) {
      if(settings.isScroll) {
        $.each(self.find('a'), function(i, el) {
          settings.hrefs.push($(el).attr('href'));
        });
        settings.hrefs.reverse();

        $(window).on('scroll', _.throttle(function(event) {
          self.trigger('current:scroll', event);
        }, 30));
      } else {
        self.trigger('current:location');
      }
    });

    self.on('current:scroll', function(e) {
      var reset = true;
      for (var i = 0; i < settings.hrefs.length; i++) {
        var $el = $(settings.hrefs[i]);
        var posY = $el.offset().top - settings.marginTop;
        if(posY < Util.getScroll().y) {
          self.trigger('current:active', settings.hrefs[i]);
          reset = false;
          break;
        }
      };
      if(reset) {
        self.trigger('current:active', '');
      }
    });

    self.on('current:active', function(e, argument) {
      $.each(self.find('a'), function(i, el) {
        var $el = $(el);
        if($el.attr('href') == argument) {
          $el.addClass('is-current');
        } else {
          $el.removeClass('is-current');
        }
      });
    });

    self.on('current:location', function(e) {
      $.each(self.find('a'), function(i, el) {
        var $el = $(el);
        if($el.attr('href') == location.pathname) {
          $el.addClass('is-current');
        } else {
          $el.removeClass('is-current');
        }
      });
    });

    self.trigger('current:init');
    return self;
  };

})(jQuery);
