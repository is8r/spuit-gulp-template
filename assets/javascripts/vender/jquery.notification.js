/*
 *  Project:
 *  Description:
 *  Author:
 *  License:
 *  Example:

<div class="notification js-notification"><ul></ul></div>
<a href="#" class="js-notification-trigger">_notification</a>

$(function () {
  $('.js-notification').notification();

  $(document).on('click', '.js-notification-trigger', function(event) {
    event.preventDefault();
    $('.js-notification').trigger('notification:push', {message: 'message message message', add_class: 'is-warning'});
  });

})

 */

;(function($) {
  'use strict';

  var PLUGIN_NAME = 'notification';

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
    settings.template = _.template('<li class="notification__item {{ data.add_class }}">{{ data.message }}</li>');

    var $inner;
    var $container;
    self.on('notification:init', function(e) {
      $container = $(this).find('> ul');
    });

    self.on('notification:push', function(e, data) {
      var item = settings.template({data: data});
      $(item).hide().appendTo($container).fadeIn().delay(3000).fadeOut();
    });

    self.trigger('notification:init');
    return self;
  };

})(jQuery);
