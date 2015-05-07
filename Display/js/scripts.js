$(document).ready(function(){
	if($('.bxslider').length > 0){
		$('.bxslider').bxSlider({
			auto: true,
			autoHover: true,
			minSlides: 4,
			maxSlides: 4,
			slideWidth: 300,
			slideMargin: 20
		});
	}
	if($('.bxslider-mini').length > 0){
		$('.bxslider-mini').bxSlider({
			auto: true,
			mode: 'fade',
			autoHover: true
		});
	}
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

	/*switch*/
	if($('.switch').length > 0){
		$('.switch i').on('click',function(e) {
				if ($(this).hasClass('grid')) {
						$('#container ul').removeClass('list').addClass('grid');
						$('.switch i.list').removeClass('active');
						$(this).addClass('active');
				}
				else if($(this).hasClass('list')) {
						$('#container ul').removeClass('grid').addClass('list');
						$('.switch i.grid').removeClass('active');
						$(this).addClass('active');
				}
		});
	}
});