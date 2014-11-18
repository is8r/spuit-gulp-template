/*
 *  Project:
 *  Description:
 *  Author:
 *  License:
 *  Howto:

    $('.js-trigger', '#topbar').dropdown({
      content: $('.js-dropdown', '#topbar')
    });
*/

;(function(jQuery) {
    var pluginName = 'dropdown';
    $[pluginName] = function(element, options) {

        //----------------------------------------------------------------------

        var defaults = {
            pluginName: pluginName,
            //TODO: mode change - hover,click
            mode: 'click',
            responsive: true,
            breakpoint: 640,
            trigger: null,
            content: null,
            timer: null
        }
        var plugin = this;
        plugin.settings = {}
        var $element = $(element);
        var el = element;
        var op;

        plugin.init = function() {
            op = plugin.settings = $.extend({}, defaults, options);

            if(!op.content) {
              trace('error!');
              return false;
            }

            op.trigger = $element;
            plugin.initDropdown();
            plugin.initResponsive();
        },

        //----------------------------------------------------------------------

        plugin.initDropdown = function(e) {
          if(!op.trigger.hasClass('is-open')) op.content.fadeOut(0);
          op.trigger.on('click', plugin.click);
        },

        //----------------------------------------------------------------------

        plugin.click = function(e) {
          if(!op.trigger.hasClass('is-open')) plugin.open();
          else plugin.close();
          return false;
        },

        plugin.open = function(e) {
          op.trigger.addClass('is-open');
          op.content.slideDown(100);
        },

        plugin.close = function(e) {
          op.trigger.removeClass('is-open');
          op.content.slideUp(100);
        },

        //----------------------------------------------------------------------

        plugin.initResponsive = function() {
          $(window).on('resize',function() {
            clearTimeout( op.timer );
            op.timer = setTimeout(function() {
              plugin.checkResponsive();
            }, 300 );
          });
          plugin.checkResponsive();
        },
        plugin.checkResponsive = function(e) {
          if($(window).width() > op.breakpoint) {
            op.trigger.addClass('is-disable');
            plugin.open();
          } else {
            op.trigger.removeClass('is-disable');
            if(!op.trigger.hasClass('is-open')) {
              plugin.close();
            } else {
              plugin.open();
            }
          }
        }

        //----------------------------------------------------------------------

        plugin.init();
    }

  $.fn[pluginName] = function(options) {if(!options) options = {};options.items = [];return this.each(function(i) {options.id = i;options.items.push($(this));if (undefined == $(this).data(pluginName)) {var plugin = new $[pluginName](this, options);$(this).data(pluginName, plugin);}});}

})(jQuery);



