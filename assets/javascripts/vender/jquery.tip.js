/*
 *  Project:
 *  Description:
 *  Author:
 *  License:
 *  Example:

$(function () {
  //$('[data-toggle="tip"]').tip();
  $('.js-tip').tip({placement: 'right'});
})

 */

;(function($) {
  'use strict';

  var PLUGIN_NAME = 'tip';

  $.fn[PLUGIN_NAME] = function(options) {
    var self = this;
    if (self.length > 1) {
      return self.each(function () {
        $(this)[PLUGIN_NAME](options);
      });
    }

    var settings = $.extend({
      placement: 'top',
      className: 'tip-inner',
      speed: 100,
      debug: true
    }, options);

    //init
    var $inner;
    self.on('tip:init', function(e) {
      self.addClass('tip');
      self.data('title', self.attr('title'));
      self.removeAttr('title');
      $inner = $('<div/>');
      $inner.addClass(settings.className);
      $inner.addClass('is-' + settings.placement);
      $inner.text(self.data('title'));
      self.append($inner);
      $inner.hide();
    });

    self.on('tip:open', function(e) {
      $inner.stop().fadeIn(settings.speed);
    });
    self.on('tip:close', function(e) {
      $inner.stop().fadeOut(settings.speed);
    });

    self.on('mouseover', function(event) {
      self.trigger('tip:open');
    });
    self.on('mouseout', function(event) {
      self.trigger('tip:close');
    });

    self.trigger('tip:init');
    return self;
  };

})(jQuery);
