
$('.loader-wrapper').show();
$('.content').css('opacity','0');


$(document).ready(function() {
    
    setTimeout( function() {
        $('.loader-wrapper').addClass('animated500 fadeOut');
        $('.content').css('opacity','1').addClass('animated1400 moveInBottomExtraShort');
        
         $('.loader-wrapper').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',  function()
       {
            $('.loader-wrapper').hide();
       });
    }, 2500);
    
});

$('a').click(function(){
    $('html, body').animate({
        scrollTop: $('[name="' + $.attr(this, 'href').substr(1) + '"]').offset().top - 50
    }, 2500);
    return false;
});