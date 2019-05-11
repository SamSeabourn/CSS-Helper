console.log( "background.js" );


const url = "https://atm-rails-burning-airlines.herokuapp.com/airplanes.json"

$.ajax( url )
	.done( function( response ) {
		console.log( 'jQuery response', response[ 1 ].model );
	} );

let results = {};
fetch( url )
	.then( function( response ) {
		return response.json();
	} )
	.then( function( myJSON ) {
		results = myJSON;
	} )
	.catch( function( error ) {
		console.error( error );
	});
