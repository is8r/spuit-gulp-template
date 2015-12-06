/*
 * scrollto
 *
 * @description
 * @version
 * @date
 * @author
 *
 * @howtouse
    //html
    <a href="#ancher" class="js-scrollto">scroll</a>
    //js
    var scrolltarget = '#conts' + e;
    $(scrolltarget).ScrollTo(800);
*/

;(function(jQuery) {

  $.addScrollTo = function() {
    $('.js-scrollto').each(function(index, el) {
      if(!$(el).attr('isReady')) {
        $(el).attr('isReady', true);
        $(el).click(function(){
          $.onScroll($(this).attr('href'));
          return false;
        });
      }
    });
  }
  $.onScroll = function(e) {
    if (!e || e == "#") target = 'body';
    else target = e;
    var margin = 20;
    var top = 0;
    if($(target).offset()) top = $(target).offset().top - margin;
    $('html, body').animate({scrollTop: top}, 500, 'easeOutExpo');
  }

  $(function(){
    $('html, body').on('mousewheel', _.throttle(function(event) {
      $('html, body').stop();
    }, 300));

    $.addScrollTo();
  });

})(jQuery);
