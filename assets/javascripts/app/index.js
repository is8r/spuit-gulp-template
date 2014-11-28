$(function() {
  // console.log('log');

  // tempura
  $('.js-tempura-output').tempura({
    $navigation: $('.js-tempura-navigation'),
    ready: 'template/_top.html'
  });

  //topbar program
  $('.js-dropdown-trigger', '.topbar').dropdown({
    content: $('.js-dropdown-content', '.topbar')
  });

});
