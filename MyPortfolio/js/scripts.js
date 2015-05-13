$(document).ready(function(){
	
		/*colorbox*/
		if($('a.stage-lnk.zoom').length > 0){
		$("a.stage-lnk.zoom").colorbox();
		}
		/*end colorbox*/

		/* filter image block */
	
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
		createList('Все',items);

		// Looping though the arrays in itemsByTags:
		$.each(itemsByTags,function(k,v){
			createList(k,v);
		});

		$('#filter a').on('click',function(e){
			var link = $(this).parent();
			
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
			var lii = $('<li>', {
				data: {list:ul}
			});
			var a = $('<a>',{
				html: text,
				href:'#',
			});
			a.appendTo(lii);
			lii.appendTo('#filter');
		}
		}
		
		/* end of filter image block */


		/* ancor */

		$('a[href*=#]').bind("click", function(e){
		     var anchor = $(this);
		     $('html, body').stop().animate({
		        scrollTop: $(anchor.attr('href')).offset().top-50
		     }, 1000);
		     e.preventDefault();
		  });
		
		/* end of ancor */

});