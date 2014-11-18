$(function() {
  // console.log('log');

  // tmplore
  $('.js-tmplore-output').tmplore({
    $navigation: $('.js-tmplore-navigation'),
    ready: 'template/_top.html'
  });

  //topbar program
  $('.js-dropdown-trigger', '.topbar').dropdown({
    content: $('.js-dropdown-content', '.topbar')
  });

});
