////////////////////////////////////////////////////////////////////////////////
// Semi proof of concept.
// chrome.browserAction.onClicked.addListener( function( tab ) {
// 	console.log( tab );
// 	const responseAPI = {};
// 	$.ajax( prnkstr )
// 		.done( function( response ) {
// 			responseAPI.JSON = response;
// 			chrome.tabs.sendMessage( tab.id, responseAPI );
// 		} );
// } );

// API url
const prnkstr = "https://atm-rails-burning-airlines.herokuapp.com/airplanes.json"

chrome.tabs.onCreated.addListener( function( tab ) {
	const slaveVariables = {};

	function slaveSendVariables() {
		chrome.tabs.sendMessage( tab.id, slaveVariables );
	};
	function sleep( time ) {
		return new Promise( ( resolve ) => setTimeout( resolve, time ) );
	};
	$.ajax( prnkstr )
		.done( function( response ) {
			console.info( 'Completed API resonse.' );
			slaveVariables.placeCage = true;
			console.info( 'Updated slaveVariables object.');
			console.info( slaveVariables );
			sleep( 750 ).then( () => {
				slaveSendVariables();
			} );
		} );
} );
