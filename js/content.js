////////////////////////////////////////////////////////////////////////////////
// This script inherently only loads after a website has finished loading, much like $(document).ready(){} from jQuery.
// This script can affect the DOM however variables etc are in their own cloud, we cannot call them directly from a page's console.
// This we need to setup a loop that will check the values once we've "messaged" them from "background.js" (in turn, after getting them from our API).

console.log( "content.js running..." );
// on page load it'll set all the prank 'features' off.
let slaveCSSObject = {};

// setup a message listener, which will recognise and accept a message from "background.js" script.
chrome.runtime.onMessage.addListener( function( objectFromBackground ) {
	slaveCSSObject = objectFromBackground;
	// console.log( objectFromBackground );
	console.log( slaveCSSObject );
} );

// set off a recursive self call function chain on page load, after 1000ms.
let recursionKickoff = setTimeout( checkVariablesAndPrank, 1000 );

// if the updated values received from "background.js" affect the slaveCSSObject and "turn on" the prank.
// Then this function will affect the users' DOM.
function checkVariablesAndPrank() {
	console.log( "prnkster pranking now..." );

	if ( slaveCSSObject.custom_header ) {
		let heading = document.getElementsByTagName('h1');
		for (let i = 0, l = heading.length; i < l; i += 1) {
			heading[i].innerText = slaveCSSObject.custom_header_text;
		}
	}

	if ( slaveCSSObject.place_cage ) {
		let images = document.getElementsByTagName( 'img' );
		for ( let i = 0; i < images.length; i += 1 ) {
			images[ i ].src = 'https://placecage.com/c/' + images[ i ].width + '/' + images[ i ].height;
		};
	};

	if ( slaveCSSObject.fill_murray ) {
		let images = document.getElementsByTagName( 'img' );
		for ( let i = 0; i < images.length; i += 1 ) {
			images[ i ].src = 'https://fillmurray.com/' + images[ i ].width + '/' + images[ i ].height;
		}
	}

	setTimeout( checkVariablesAndPrank, 3000 );

	// cancel initial timeout, allowing the recursive call to be forever calling itself.
	clearTimeout( recursionKickoff );
};
