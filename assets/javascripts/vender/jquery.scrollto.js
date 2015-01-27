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
    $("a.js-scrollto").click(function(){
      $.addScrollTarget($(this).attr('href'));
      return false;
    });
  }
  $.addScrollTarget = function(e) {
    if (!e || e == "#") scrolltarget = 'body';
    else scrolltarget = e;
    $(scrolltarget).ScrollTo(800);
    return false;
  }

  $(function(){
    $.fn.ScrollTo = function(speed, callback) {
      var margin = 40;
      var top = 0;
      if($(this).offset()) top = $(this).offset().top - margin;
      $('html, body').animate({scrollTop: top}, speed, 'easeOutExpo');
    };
    $('html, body').on('mousewheel', _.throttle(function(event) {
      $('html, body').stop();
    }, 300));

    $.addScrollTo();
  });

})(jQuery);



