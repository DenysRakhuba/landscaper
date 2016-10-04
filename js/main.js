// Navbar scrolling per block
$(function() {
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1000);
        event.preventDefault();
    });
});

//Navbar active state per block
$('body').scrollspy({
    target: '.navbar-fixed-top'
})

//Navbar scroll down animation
$(window).scroll(function() {
    if ($(".navbar").offset().top > 50) {
        $(".navbar-fixed-top").addClass("top-nav-collapse");
    } else {
        $(".navbar-fixed-top").removeClass("top-nav-collapse");
    }
});
//Header text animation
var $whichSlide = 2;
$.fn.animation = function ()  {
  //get the welcome msg element
  var $message = $(this);

  //get a list of letters from the welcome text
  var $getList = $(this).text().split("");
  //clear the welcome text msg
  $(this).text("");
  $(this).css("opacity",1);
  //loop through the letters in the list array
  $.each($getList, function(idx, element) {
    //create a span for the letter and set opacity to 0
    var newElement = $("<span/>").text(element).css({
      opacity: 0
    });
    //append it to the welcome message
    newElement.appendTo($message);
    //set the delay on the animation for this element
    newElement.delay(idx * 90);
    //animate the opacity back to full 1
    newElement.animate({
      opacity: 1
    }, 1100);
  });
};

$('.introduction').animation();
setTimeout(function(){
  $('.secondary').animation();
},2000);

$('.carousel').carousel({
	interval: 8000,
});
$('.carousel').bind('slid.bs.carousel', function (e) {
    if($whichSlide == 1){
      //set $whichSlide position for the next slide event
      $whichSlide = 2
      //start to animate the text
      $('.introduction').animation();
      setTimeout(function(){
  $('.secondary').animation();
},2000);
      //set the text on the second slide to be invisible because we don't want it to appear before animation starts
      $('.slide2').css("opacity",0);
    }else if($whichSlide == 2){
      $whichSlide = 1;
      $(".carousel").carousel("pause");
      $(".slide2").animation();
      setTimeout(function(){
       $(".carousel").carousel();
      },3000);
      $('.introduction').css("opacity",0);
      $('.secondary').css("opacity",0);
    }
});

//Portfolio animation setup
$('#Container').mixItUp();


//Contact form
$(function() {
    // Get the form.
    var form = $('#contactForm');

    // Get the messages div.
    var formMessages = $('#form-messages');

    // Set up an event listener for the contact form.
    $(form).submit(function(event) {
        // Stop the browser from submitting the form.
        event.preventDefault();

        // Serialize the form data.
        var formData = $(form).serialize();
        // Submit the form using AJAX.
        $.ajax({
            type: 'POST',
            url: $(form).attr('action'),
            data: formData
        }).done(function(response) {
              // Make sure that the formMessages div has the 'success' class.
              $(formMessages).removeClass('error');
              $(formMessages).addClass('success');

              // Set the message text.
              $(formMessages).text(response);

              // Clear the form.
              $('#name').val('');
              $('#email').val('');
              $('#message').val('');
          }).fail(function(data) {
                // Make sure that the formMessages div has the 'error' class.
                $(formMessages).removeClass('success');
                $(formMessages).addClass('error');

                // Set the message text.
                if (data.responseText !== '') {
                    $(formMessages).text(data.responseText);
                } else {
                    $(formMessages).text('Oops! An error occured and your message could not be sent.');
                }
            });
    });
});
