/*
 * viewports
 *
 * @description
 * @version
 * @date
 * @author
 *
 * @howtouse
*/

(function(jQuery) {

  //----------------------------------------------------------------------

  $(function(){
    $.extend({
        nowOrientation: -1,
        viewports: function() {
          if(Util.isMobile()) {
            $(window).on('orientationchange resize load', $.orientationCheck);
            $.orientationCheck();
          }
          return false;
        },
        orientationCheck: function() {

          // var portrait = 'width=device-width,initial-scale=1,minimum-scale=0.1,maximum-scale=1';
          var portrait = 'width='+$(window).width()+'px,initial-scale=1.0,minimum-scale=0.1,maximum-scale=1';
          var landscape = 'width=1024px,initial-scale=1,minimum-scale=0.1,maximum-scale=1';

          if($(window).width() == 667 || $(window).width() == 768) {
            portrait = 'width='+$(window).width()+'px,initial-scale=0.75,minimum-scale=0.1,maximum-scale=1';
            landscape = 'width=1024px,initial-scale=0.75,minimum-scale=0.1,maximum-scale=1';
          }

          //orientation
          if(window.orientation == 0) {
            if($.nowOrientation != 0) {
              $.nowOrientation = 0;
              $('#viewport').attr('content', portrait);
            }
          } else {
            if($.nowOrientation != 1) {
              $.nowOrientation = 1;
              $('#viewport').attr('content', landscape);
            }
          }
        }
    });
    $.viewports();
  });

  //----------------------------------------------------------------------

})(jQuery);

