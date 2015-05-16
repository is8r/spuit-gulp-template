/*
 * device
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
        device: function() {
          $.deviceCheck();
          $.windowCheck();
          $(window).on('orientationchange resize', $.windowCheck);
          return false;
        },
        deviceCheck: function() {
          if(navigator.userAgent.indexOf('iPhone') > 0 || navigator.userAgent.indexOf('iPod') > 0 || (navigator.userAgent.indexOf('Android') > 0 && navigator.userAgent.indexOf('Mobile') > 0)){
            $('body').addClass('smartphone');
          } else if(navigator.userAgent.indexOf('iPad') > 0 || (navigator.userAgent.indexOf('Android') > 0 && navigator.userAgent.indexOf('Mobile') == -1) || navigator.userAgent.indexOf('A1_07') > 0 || navigator.userAgent.indexOf('SC-01C') > 0){
            $('body').addClass('tablet');
          }
        },
        windowCheck: function() {
          //orientation
          if(window.orientation == 0) {
            $('body').addClass('portrait');
            $('body').removeClass('landscape');
          } else {
            $('body').addClass('landscape');
            $('body').removeClass('portrait');
          }
          //responsive
          var responsiveWidth = 640;
          if($(window).width() < responsiveWidth) {
            $('body').addClass('responsive');
          } else {
            $('body').removeClass('responsive');
          }
        }
    });
    $.device();
  });

  //----------------------------------------------------------------------

})(jQuery);

