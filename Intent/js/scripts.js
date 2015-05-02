$(document).ready(function(){
	$('.slider-area').slick({
		prevArrow: '.photo-slider .prev',
		nextArrow: '.photo-slider .next',
		dots: true,
		infinite: true,
		speed: 500,
		fade: true,
		cssEase: 'linear'
	});
});