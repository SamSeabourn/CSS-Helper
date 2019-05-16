const marquee = function( element, amount ) {
	return $( element ).wrap( `<marquee scrollamount="${ amount }">` );
};

marquee( 'p', 250 );
