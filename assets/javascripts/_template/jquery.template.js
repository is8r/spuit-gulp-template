/*
 *  Project:
 *  Description:
 *  Author:
 *  License:
 *  Exsample:


$(function() {
  $('#element').pluginName({'foo': 'bar'});
  $('#element').data('pluginName').public_function();
  $('#element').data('pluginName').settings.foo;
});

 */

;(function(jQuery) {
  var pluginName = 'template';
  $[pluginName] = function(element, options) {

    //----------------------------------------------------------------------

    var defaults = {
        pluginName: pluginName
    }
    var plugin = this;
    plugin.settings = {}
    var $element = $(element);
    var el = element;
    var options;

    plugin.init = function() {
        options = plugin.settings = $.extend({}, defaults, options);

        //
        plugin.public_function();
        private_function();
    }

    //----------------------------------------------------------------------

    plugin.public_function = function(e) {}
    var private_function = function(e) {}

    //----------------------------------------------------------------------

    plugin.init();
  }

  $.fn[pluginName] = function(options) {if(!options) options = {};options.items = [];return this.each(function(i) {options.id = i;options.items.push($(this));if (undefined == $(this).data(pluginName)) {var plugin = new $[pluginName](this, options);$(this).data(pluginName, plugin);}});}

})(jQuery);
