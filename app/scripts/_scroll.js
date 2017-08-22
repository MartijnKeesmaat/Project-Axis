var items = $(".home-slide");
var animating = false;
    $(window).scroll(function() {
        clearTimeout($.data(this, 'scrollTimer'));
        if (!animating) {
            $.data(this, 'scrollTimer', setTimeout(function() {
                items.each(function(key, value) {
                    if ($(window).scrollTop() < $(value).offset().top+120 && $(window).scrollTop() > $(value).offset().top-120 ) {
                        animating = true;
                        $('body').animate( { scrollTop: $(value).offset().top + 'px' }, 250);
                        setTimeout(function() { animating = false; }, 300);
                        return false;
                    }
                });
            }, 200));
        }
    });


// Select all links with hashes
$('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function(event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
      &&
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000, function() {
          // Callback after animation
          // Must change focus!
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) { // Checking if the target was focused
            return false;
          } else {
            $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
            $target.focus(); // Set focus again
          };
        });
      }
    }
  });


$.fn.moveIt = function(){
  var $window = $(window);
  var instances = [];

  $(this).each(function(){
    instances.push(new moveItItem($(this)));
  });

  window.onscroll = function(){
    var scrollTop = $window.scrollTop();
    instances.forEach(function(inst){
      inst.update(scrollTop);
    });
  }
}

var moveItItem = function(el){
  this.el = $(el);
  this.speed = parseInt(this.el.attr('data-scroll-speed'));
};

moveItItem.prototype.update = function(scrollTop){
  this.el.css('transform', 'translateY(' + -(scrollTop / this.speed) + 'px)');
};

// Initialization
$(function(){
  $('[data-scroll-speed]').moveIt();
});


// ScrollReveal
window.sr = ScrollReveal();
sr.reveal('.reveal-hero', { duration: 2000 }, 50);
sr.reveal('.reveal-footer', { duration: 2000 }, 50);


// Nav activate
$(function() {
    var body = $("body");
    var offsetHeight = document.getElementById('hero-unit').offsetHeight - 50;
    $(window).scroll(function() {
        var scroll = $(window).scrollTop();

        if (scroll >= offsetHeight) {
            body.removeClass('preHeader').addClass("scrolledPastHeader");
        } else {
            body.removeClass("scrolledPastHeader").addClass('preHeader');
        }
    });
});


var elementPosition = $('#hero-circle').offset();

$(window).scroll(function(){
  if($(window).scrollTop() + 10 > elementPosition.top){
    $('#hero-circle').addClass('fixScroll')
  } else {
    $('#hero-circle').removeClass('fixScroll');
  }
});


$('.hero-unit__circle a').click(function(e) {
  e.preventDefault();
  $(this).parent().toggleClass('navigation--is-active');
  $('body').toggleClass('body-navigation--is-active');
})
