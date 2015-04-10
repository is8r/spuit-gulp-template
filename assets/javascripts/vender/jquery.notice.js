/*
 *  Project:
 *  Description:
 *  Author:
 *  License:
 *  Example:

<div class="notice js-notice"><ul></ul></div>
<a href="#" class="js-notice-trigger">_notice</a>

$(function () {
  $('.js-notice').notice();

  $(document).on('click', '.js-notice-trigger', function(event) {
    event.preventDefault();
    $('.js-notice').trigger('notice:push', {message: 'message message message', add_class: 'is-warning'});
  });

})
 */

;(function($) {
  'use strict';

  var PLUGIN_NAME = 'notice';

  $.fn[PLUGIN_NAME] = function(options) {
    var self = this;
    if (self.length > 1) {
      return self.each(function () {
        $(this)[PLUGIN_NAME](options);
      });
    }

    var settings = $.extend({
      template: null,
      speed: 100,
      debug: true
    }, options);

    _.templateSettings = {interpolate: /\{\{(.+?)\}\}/g};
    settings.template = _.template('<li class="notice__item {{ data.add_class }}">{{ data.message }}</li>');

    var $container;
    self.on('notice:init', function(e) {
      $container = $(this).find('> ul');
    });

    self.on('notice:push', function(e, data) {
      var item = settings.template({data: data});
      $container.append(item);
      self.trigger('notice:init_items');
    });

    self.on('notice:init_items', function(e) {
      $.each(self.find('> ul > li'), function(i, item) {
        var $item = $(item);
        if (!$item.attr('isReady')) {
          $item.attr('isReady', true);
          $item.hide().fadeIn().delay(3000).fadeOut();
          $item.on('click', function(e) {
            self.trigger('notice:click', this);
          });
        }
      });
    });

    self.on('notice:click', function(e, item) {
      $(item).stop().fadeOut();
    });

    self.trigger('notice:init');
    return self;
  };

})(jQuery);
