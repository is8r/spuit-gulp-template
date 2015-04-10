$(function() {
  // console.log('log');

  // tempura
  $('.js-tempura-output').tempura({
    $navigation: $('.js-tempura-navigation'),
    ready: 'template/_top.html',
    callback: refresh
  });

  //topbar program
  $('.js-dropdown-trigger', '.topbar').dropdown({
    content: $('.js-dropdown-content', '.topbar')
  });

  function refresh() {
    $('.js-tip').tip({placement: 'right'});

    $('.js-notice').notice();
  }

  $(document).on('click', '.js-notice-trigger', function(event) {
    event.preventDefault();
    $('.js-notice').trigger('notice:push', {message: 'message message message', add_class: 'is-warning'});
  });

});
