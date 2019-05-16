// Needs tweaking, mouseMove X rotate <body> left and vice versa.
var rotation = 0;

jQuery.fn.rotate = function( degrees ) {
	$( this ).css( {
		'transform': 'rotate(' + degrees + 'deg)'
	} );
	return $( this );
};

$( 'body' ).mousemove( function() {
	rotation += 1;
	$( this ).rotate( rotation );
} );
