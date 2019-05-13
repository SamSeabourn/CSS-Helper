const prnkstr = "https://atm-rails-burning-airlines.herokuapp.com/airplanes.json"

// setup a listener so that when a user opens a link in a new tab
// when detected it sends the API reponse to "content.js" ... thus affecting the users' DOM.
chrome.tabs.onCreated.addListener( function( tab ) {
	const slaveVariables = {};


	function slaveSendVariables() {
		chrome.tabs.sendMessage( tab.id, slaveVariables );
	};
	// function to setup a promise pause, must like Ruby's "sleep 1" method
	function sleep( time ) {
		return new Promise( ( resolve ) => setTimeout( resolve, time ) );
	};
	$.ajax( prnkstr )
		.done( function( response ) {
			console.info( 'Completed API resonse.' );
			// faking the returned API value
			slaveVariables.placeCage = true;
			console.info( 'Updated slaveVariables object.');
			console.info( slaveVariables );
			// required or else it won't send to "content.js" for some reason.
			sleep( 750 ).then( () => {
				slaveSendVariables();
			} );
		} );
} );
