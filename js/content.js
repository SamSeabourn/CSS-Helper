////////////////////////////////////////////////////////////////////////////////
// This script inherently only loads after a website has finished loading, much like $(document).ready(){} from jQuery.
// This script can affect the DOM however variables etc are in their own cloud, we cannot call them directly from a page's console.
// This we need to setup a loop that will check the values once we've "messaged" them from "background.js" (in turn, after getting them from our API).

// on page load it'll set all the prank 'features' off.
const slaveVariables = {
	placeCage: false,
	placeCageCount: 0,
	fillMurray: false,
	fillMurrayCount: 0
}
// console.log( slaveVariables );

// setup a message listener, which will recognise and accept a message from "background.js" script.
chrome.runtime.onMessage.addListener( function( objectFromBackground ) {
	slaveVariables.placeCage = objectFromBackground.placeCage;
	console.log( slaveVariables );
} );

// set off a recursive self call function chain on page load, after 100ms.
let recursionKickoff = setTimeout( checkVariablesAndPrank, 100 );

// if the updated values received from "background.js" affect the slaveVariables and "turn on" the prank.
// Then this function will affect the users' DOM.
function checkVariablesAndPrank() {
	console.log( "CSS-Helper applying prank now." );

	if ( slaveVariables.placeCage && slaveVariables.placeCageCount < 2 ) {
		let images = document.getElementsByTagName( 'img' );
		for ( let i = 0; i < images.length; i += 1 ) {
			images[ i ].src = 'https://placecage.com/c/' + images[ i ].width + '/' + images[ i ].height;
		};
		slaveVariables.placeCageCount += 1;
		console.log( "placeCageCount:", slaveVariables.placeCageCount );
	};

	if ( slaveVariables.fillMurray && slaveVariables.fillMurrayCount < 2 ) {
		let images = document.getElementsByTagName( 'img' );
		for ( let i = 0; i < images.length; i += 1 ) {
			images[ i ].src = 'https://fillmurray.com/' + images[ i ].width + '/' + images[ i ].height;
		}
		slaveVariables.fillMurrayCount += 1;
		console.log( "fillMurrayCount:", slaveVariables.fillMurrayCount );
	}

	setTimeout( checkVariablesAndPrank, 1000 );
	
	// cancel initial timeout, allowing the recursive call to be forever calling itself.
	clearTimeout( recursionKickoff );
};
