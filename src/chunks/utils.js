function formatNumber(num)
{
  num = num.replace(/\D/g, '');
  return ("" + num).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, function($1) { return $1 + " " });
}
$.fn.thousandSeparate = function () {
  return this.each(function () {
    var $input = $(this);
    $input.bind('keyup', function (e) {
      $input.val(formatNumber($input.val()));
    });
  });
};
$.fn.thousandSeparateString = function () {
  this.text(formatNumber(this.text()));
};

$(document).ready(function() {
  var $body = $('body');
  $('.autoComplete').autoComplete();
  //modal
  $body.on('click', '.ajax-modal', function(e){
    e.preventDefault();
    var $obj = $(this).data("target");

    $($obj+' .modal-body').load($(this).data("remote"),function(){
      $($obj).addClass($css);
      $(".modal-backdrop").remove();
      $($obj).modal({show:true});
    });
  });
  //table-modal
  $body.on('click', '.table-modal', function(e){
    e.preventDefault();
    var $obj = $(this).closest('.table-set').find('.modal');
    $obj.modal({show:true});
  });
  //thousand separate
  $('[data-thousand-separate]').each(function(){
    $(this).thousandSeparateString();
  });

  var slider = $('.custom-scroll');
  var isDown = false;
  var startX;
  var scrollLeft;

  slider.on('mousedown', (e) => {
    isDown = true;
    slider.addClass('active');
    startX = e.pageX - slider.offset().left;
    scrollLeft = slider.scrollLeft();
  });
  slider.on('mouseleave', () => {
    isDown = false;
    slider.removeClass('active');
  });
  slider.on('mouseup', () => {
    isDown = false;
    slider.removeClass('active');
  });
  slider.on('mousemove', (e) => {
    if(!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offset().left;
    const walk = (x - startX) * 2; //scroll-fast
    slider.scrollLeft(scrollLeft - walk);
  });
});
