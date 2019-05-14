////// DATA ////////////////////////////////////////////////////////////////////
/// Current data
let slaveName = "" // This comes from the cloud save data and retrieved with "getSlaveDetailStorage()"
let masterName = "" // This comes from the cloud saved data and retrieved with "getMasterDetailStorage()"
let foundSlaveArrayIndex = 0 // This comes from an API Search
let slaveCSSObject = {} // This comes from the API to be sent to the content.JS

/// Server URLS
const SLAVE_URL = "https://prnkstrserver.herokuapp.com/users.json"
const MASTER_URL = "https://prnkstrserver.herokuapp.com/masters.json"

////// FUNCTIONS ///////////////////////////////////////////////////////////////
/// Retrieving slave name from cloud storage
const getSlaveDetailStorage = function() {
	chrome.storage.sync.get( "slaveName", function( result ) {
		slaveName = ( result.slaveName );
	} );
}
/// Retrieving master name from cloud storage
const getMasterDetailStorage = function() {
	chrome.storage.sync.get( "masterName", function( result ) {
		masterName = ( result.masterName );
	} );
}

/// Iterating through the API to find a slave match. It then returns the ID number to 'foundSlaveArrayIndex'
const slaveDataGetter = function() {
	$.getJSON( SLAVE_URL )
		.done( ( response ) => {
			for ( let i = 0; i < response.length; i += 1 ) {
				// Iterating over Users.json response looking for match against local storage 'slaveName'
				if ( slaveName === '"' + response[ i ].name + '"' ) {
					// console.log( "Match found! Array possition " + response[ i ] );
					foundSlaveArrayJsonIndex = [ i ] // this remebers the ID of the slave found
				}
			}
		} )
		.done( ( response ) => {
			console.log( response );
			slaveCSSObject = {
				"fill_murray": response[ foundSlaveArrayIndex ].fill_murray,
				"place_cage": response[ foundSlaveArrayIndex ].place_cage,
				"custom_header": response[ foundSlaveArrayIndex ].custom_header,
				"custom_header_text": response[ foundSlaveArrayIndex ].custom_header_text
			}
		})
}

/// This function is fired on page reload
chrome.tabs.onUpdated.addListener( function( tabId, changeInfo, tab ) {
	console.log( changeInfo );
	getSlaveDetailStorage(); // Getting the Slave Data from Storage
	getMasterDetailStorage() // Getting the Masters details from storage
	if ( tab.status === "loading" ) {
		slaveDataGetter() // Ping API for values for DOM manipulation object.
	} else if ( tab.status === "complete" ) {
		chrome.tabs.query( {
			active: true
		}, function( tabs ) {
			// console.log( slaveCSSObject );
			chrome.tabs.sendMessage( tabs[ 0 ].id, slaveCSSObject );
		} );
	}


} )
