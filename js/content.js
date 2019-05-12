////////////////////////////////////////////////////////////////////////////////
// Semi proof of concept.
// chrome.runtime.onMessage.addListener( function( objectFromBackground ) {
// 		console.log( objectFromBackground.JSON );
// } );

const slaveVariables = {
	placeCage: false,
	placeCageCount: 0
}
chrome.runtime.onMessage.addListener( function( objectFromBackground ) {
	// console.log( objectFromBackground.placeCage );
	slaveVariables.placeCage = objectFromBackground.placeCage;
	console.log( slaveVariables );
} );

let recursionKickoff = setTimeout( checkVariables, 2000 );

function checkVariables() {
	console.log( "CSS-Helper running now." );
	if ( slaveVariables.placeCage && slaveVariables.placeCageCount < 2 ) {
		let images = document.getElementsByTagName( 'img' );
		for ( let i = 0, l = images.length; i < l; i += 1 ) {
			images[ i ].src = 'https://placecage.com/' + images[ i ].width + '/' + images[ i ].height;
			slaveVariables.placeCageCount += 1;
		};
		console.log( slaveVariables.placeCageCount );
	};
	setTimeout( checkVariables, 1000 );
	clearTimeout( recursionKickoff );
};
