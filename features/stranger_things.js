$( 'img' ).stop().animate( {
	rotation: 180
}, {
	duration: 1000,
	step: function( now, fx ) {
		$( this ).css( {
			"transform": "rotate(" + now + "deg)"
		} );
	}
} );
