$(function() {

  $('.js-dropdown-trigger', '.topbar').dropdown({
    content: $('.js-dropdown-content', '.topbar')
  });
  $('.js-elevator').elevator({marginTop: 0});
  $('.js-current-sidebar').current({isScroll: true, marginTop: 30});
  $('.js-current-topbar').current();

  // $('.js-tip').tip({placement: 'right'});
  // $('.js-notice').notice();

  // $(document).on('click', '.js-notice-trigger', function(event) {
  //   event.preventDefault();
  //   $('.js-notice').trigger('notice:push', {message: 'message message message', add_class: 'is-warning'});
  // });

});
