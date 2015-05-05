$(document).ready(function(){
	if($('.slider-area').length > 0){
		$('.slider-area').slick({
			infinite: false,
			slidesToShow: 2,
			slidesToScroll: 2
		});
	}

/*tooltip*/
if ($('[rel~=tooltip]').length > 0){
var targets = $( '[rel~=tooltip]' ),
	target	= false,
	tooltip = false,
	title	= false;

targets.bind( 'mouseenter', function()
{
	target	= $( this );
	tip		= '<i>'+target.attr( 'title' )+'</i>'+'<b></b>';
	tooltip	= $( '<span class="modal"></span>' );

	if( !tip || tip == '' )
		return false;

	target.removeAttr( 'title' );
	tooltip.css( 'opacity', 0 )
		   .html( tip )
		   .appendTo( 'body' );

	var init_tooltip = function()
	{
		if( $( window ).width() < tooltip.outerWidth() * 1.5 )
			tooltip.css( 'max-width', $( window ).width() / 2 );
		else
			tooltip.css( 'max-width', 340 );

		var pos_left = target.offset().left + ( target.outerWidth() / 2 ) - ( tooltip.outerWidth() / 2 ),
			pos_top	 = target.offset().top - tooltip.outerHeight() - 40;

		if( pos_left < 0 )
		{
			pos_left = target.offset().left + target.outerWidth() / 2 - 20;
			tooltip.addClass( 'left' );
		}
		else
			tooltip.removeClass( 'left' );

		if( pos_left + tooltip.outerWidth() > $( window ).width() )
		{
			pos_left = target.offset().left - tooltip.outerWidth() + target.outerWidth() / 2 + 20;
			tooltip.addClass( 'right' );
		}
		else
			tooltip.removeClass( 'right' );

		if( pos_top < 0 )
		{
			var pos_top	 = target.offset().top + target.outerHeight();
			tooltip.addClass( 'top' );
		}
		else
			tooltip.removeClass( 'top' );

		tooltip.css( { left: pos_left, top: pos_top } )
			   .animate( { top: '+=10', opacity: 1 }, 50 );
	};

	init_tooltip();
	$( window ).resize( init_tooltip );

	var remove_tooltip = function()
	{
		tooltip.animate( { top: '-=10', opacity: 0 }, 50, function()
		{
			$( this ).remove();
		});

		target.attr( 'title', tip );
	};

	target.bind( 'mouseleave', remove_tooltip );
	tooltip.bind( 'click', remove_tooltip );
});
}
/*end tooltip*/

/*ancor*/
$('a[href*=#]').bind("click", function(e){
     var anchor = $(this);
     $('html, body').stop().animate({
        scrollTop: $(anchor.attr('href')).offset().top-50
     }, 1000);
     e.preventDefault();
  });

/*filter image block*/
if($('#filter').length > 0){
var items = $('#stage li'),
	itemsByTags = {};

// Looping though all the li items:

items.each(function(i){
	var elem = $(this),
		tags = elem.data('tags').split(',');
	
	// Adding a data-id attribute. Required by the Quicksand plugin:
	elem.attr('data-id',i);
	
	$.each(tags,function(key,value){
		
		// Removing extra whitespace:
		value = $.trim(value);
		
		if(!(value in itemsByTags)){
			// Create an empty array to hold this item:
			itemsByTags[value] = [];
		}
		
		// Each item is added to one array per tag:
		itemsByTags[value].push(elem);
	});
	
});

// Creating the "All" option in the menu:
createList('All',items);

// Looping though the arrays in itemsByTags:
$.each(itemsByTags,function(k,v){
	createList(k,v);
});

$('#filter a').on('click',function(e){
	var link = $(this);
	
	link.addClass('active').siblings().removeClass('active');
	
	// Using the Quicksand plugin to animate the li items.
	// It uses data('list') defined by our createList function:
	
	$('#stage').quicksand(link.data('list').find('li'));
	e.preventDefault();
});

$('#filter a:first').click();

function createList(text,items){
	
	// This is a helper function that takes the
	// text of a menu button and array of li items
	
	// Creating an empty unordered list:
	var ul = $('<ul>',{'class':'hidden'});
	
	$.each(items,function(){
		// Creating a copy of each li item
		// and adding it to the list:
		
		$(this).clone().appendTo(ul);
	});

	ul.appendTo('#container');

	// Creating a menu item. The unordered list is added
	// as a data parameter (available via .data('list'):
	
	var a = $('<a>',{
		html: text,
		href:'#',
		data: {list:ul}
	}).appendTo('#filter');
}
}

});