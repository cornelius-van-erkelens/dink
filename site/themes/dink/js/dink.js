
$(document).ready(function() {

	$('#main').smoothState({
		onStart : {
			duration: 2300,
			render: function ($container) {

				$container.removeClass('is-animating-back');
				$container.addClass('is-animating');

			}
		},
		onReady: {

			duration: 0,
			render: function($container, $newContent){

				$container.removeClass('is-animating');
				$container.html($newContent);

			}

		},
		onAfter: function($container) {

			$container.addClass('is-animating-back');

		}
	}).data('smoothState');

	//section animation

	var scrollContainerHeight = 0;

	$('.section').each(function(){
		var sectionHeight = $(this).height();
		scrollContainerHeight = scrollContainerHeight + sectionHeight;
		$(this).attr('data-offset', $(this).offset().top);
	});

	$('.scroll-container').css({ 'height': scrollContainerHeight });
	$('.scroller').css({ 'height': scrollContainerHeight });


	// $(window).scroll(function(){
	//
	// 	var wScroll = $(this).scrollTop();
	// 	var target = $('.active-section').data('target');
	// 	var activeOffset = $('.active-section').offset().top;
	// 	var isAnimating = false;
	// 	var speed = 1000;
	//
	// 	if(isAnimating === false)
	// 	{
	// 		if(wScroll > activeOffset){
	// 			isAnimating = true;
	// 			window.onwheel = function(){ return false; }
	// 			$('html, body').animate({
	// 				scrollTop: $('#section-' + (target + 1)).offset().top
	// 			}, speed, function(){
	// 				window.onwheel = function(){ return true; }
	// 				isAnimating = false;
	// 				$('.active-section').removeClass('active-section');
	// 				$('#section-' + (target + 1)).addClass('active-section');
	// 			});
	// 		}
	//
	// 		if(wScroll < activeOffset){
	// 			isAnimating = true;
	// 			window.onwheel = function(){ return false; }
	// 			$('html, body').animate({
	// 				scrollTop: $('#section-' + (target - 1)).offset().top
	// 			}, speed, function(){
	// 				window.onwheel = function(){ return true; }
	// 				isAnimating = false;
	// 				$('.active-section').removeClass('active-section');
	// 				$('#section-' + (target - 1)).addClass('active-section');
	// 			});
	// 		}
	// 	}
	// });

	var trottled = _.throttle(animateSection, 2200);


	var scrolled = 0;
	var direction = 'down';
	$(window).scroll(function(){

		var wScroll = $(this).scrollTop();

		if(wScroll > scrolled)
		{
			direction = 'down';
		} else {
			direction = 'up';
		}

		scrolled = wScroll;

	});
	$(window).scroll(trottled);



	function animateSection() {

		if(direction == 'down')
		{
			var target = $('.active-section').data('target');
			var offset = $('#section-' + (target + 1)).data('offset');

			$('.scroll-container').stop().animate({
				'top': '-' + offset + 'px'
			}, 2000, function(){
				$('.active-section').removeClass('active-section');
				$('#section-' + (target + 1)).addClass('active-section');
			});
		} else {
			var target = $('.active-section').data('target');
			var offset = $('#section-' + (target - 1)).data('offset');

			$('.scroll-container').stop().animate({
				'top': '-' + offset + 'px'
			}, 2000, function(){
				$('.active-section').removeClass('active-section');
				$('#section-' + (target - 1)).addClass('active-section');
			});
		}



	}


});
