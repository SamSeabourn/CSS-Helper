////// DATA ////////////////////////////////////////////////////////////////////
/// Current data
let slaveName = "" // This comes from the cloud save data and retrieved with "getSlaveDetailStorage()"
let masterName = "" // This comes from the cloud saved data and retrieved with "getMasterDetailStorage()"
let foundSlaveID = 0 // This comes from an API Search
let slaveCSSObject = {} // This comes from the API to be sent to the content.JS

/// Server URLS
const SLAVE_URL = "https://prnkstrserver.herokuapp.com/users.json"
const MASTER_URL = "https://prnkstrserver.herokuapp.com/masters.json"

////// FUNCTIONS ///////////////////////////////////////////////////////////////
/// Retrieving slave name from cloud storage
const getSlaveDetailStorage = function() {
	chrome.storage.sync.get( [ "slaveName" ], function( result ) {
		slaveName = ( result.slaveName );
	} );
}
/// Retrieving master name from cloud storage
const getMasterDetailStorage = function() {
	chrome.storage.sync.get( [ "masterName" ], function( result ) {
		masterName = ( result.masterName );
	} );
}

/// Iterating through the API to find a slave match. It then returns the ID number to 'foundSlaveID'
const slaveIDGetter = function() {
	$.ajax( SLAVE_URL )
		.done( ( response ) => {
			let allSlavesObject = response
			for ( let i = 0; i < allSlavesObject.length; i += 1 ) {
				console.log( "Iterating through, now on --> " + allSlavesObject[ i ].name )
				if ( slaveName === '"' + allSlavesObject[ i ].name + '"' ) {
					console.log( "Match found! Array possition " + allSlavesObject[ i ] );
					foundSlaveID = [ i ] // this remebers the ID of the slave found
				}
			}
		} )
}

/// Getting all of the Data from the API and compiling it into a single object
const slaveCSSSettingsGetter = function() {
	$.ajax( SLAVE_URL )
		.done( ( response ) => {
			console.log( "Below is the returned data from the API." );
			let retrievedObject = response
			slaveCSSObject = { // The lines below build the object
				"fill_murray": retrievedObject[ foundSlaveID ].fill_murray,
				"place_cage": retrievedObject[ foundSlaveID ].place_cage,
				"custom_header": retrievedObject[ foundSlaveID ].custom_header,
				"custom_header_text": retrievedObject[ foundSlaveID ].custom_header_text
			}
		} )
}

/// This function is fired when the page is reloaded
chrome.tabs.onUpdated.addListener( function() {
	getMasterDetailStorage() // Getting the Masters details from storage
	getSlaveDetailStorage() // Getting the Slave Data from Storage
	slaveIDGetter() // Finding the ID of the slave
	slaveCSSSettingsGetter() // Finding the settings of the slave and building an object to pass into the content.js

	chrome.tabs.query( {}, function( tabs ) {
		console.log( 'About to loop through all tabs and send the response to a listener. Object below.' );
		console.log( slaveCSSObject );
		// This sends the CSS object to all tabs in the browser. Only our app is listening for it.
		for ( let i = 0; i < tabs.length; i += 1 ) {
			chrome.tabs.sendMessage( tabs[ i ].id, slaveCSSObject );
		};
	} );

} )
