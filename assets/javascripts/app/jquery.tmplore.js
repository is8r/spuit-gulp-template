/*
 *  Project:
 *  Description:
    jquery ajax + underscore templete example

 *  Author:
 *  License:
 *  Howto:

  $('.js-tmplore-output').tmplore({
    $navigation: $('.js-tmplore-navigation'),
    ready: 'template/_top.html'
  });
*/

;(function(jQuery) {
    var pluginName = 'tmplore';
    $[pluginName] = function(element, options) {

        //----------------------------------------------------------------------

        var defaults = {
            pluginName: pluginName,
            $output: null,
            $navigation: null,
            ready: null
        }
        var plugin = this;
        plugin.settings = {}
        var $element = $(element);
        var el = element;
        var op;

        plugin.init = function() {
            op = plugin.settings = $.extend({}, defaults, options);
            op.$output = $element;

            plugin.templateSettings();
            plugin.initNavigation();

            window.onhashchange = plugin.checkHash;
            plugin.checkHash();
        },

        //----------------------------------------------------------------------

        plugin.templateSettings = function() {
          _.templateSettings = {interpolate: /\{\{(.+?)\}\}/g};
        },

        plugin.initNavigation = function() {
          op.$navigation.find('a').each(function(i, el) {
            $(el).on('click', function(event) {
              event.preventDefault();
              var src = $(this).attr('data-src');
              plugin.loadTmpl(src);
            });
          });
        },

        plugin.checkHash = function() {
          var hash = location.hash;
          if(!hash && op.ready) hash = op.ready;
          if(hash) plugin.loadTmpl(hash.replace('#', ''));
        },

        plugin.loadTmpl = function(path, data) {
          if(op.ready && op.ready == path) {
            location.hash = '';
          } else {
            location.hash = path;
          }

          op.$output.empty();
          op.$output.addClass('is-loading');
          $.ajax({
            url: path,
            type: 'GET'
          })
          .done(function(e) {
            var html = _.template(e)(data);
            op.$output.removeClass('is-loading');
            op.$output.empty();
            op.$output.append(html);
          }).error(function(e) {
            plugin.loadTmpl(op.ready);
          });
        }

        //----------------------------------------------------------------------

        plugin.init();
    }

  $.fn[pluginName] = function(options) {if(!options) options = {};options.items = [];return this.each(function(i) {options.id = i;options.items.push($(this));if (undefined == $(this).data(pluginName)) {var plugin = new $[pluginName](this, options);$(this).data(pluginName, plugin);}});}

})(jQuery);



