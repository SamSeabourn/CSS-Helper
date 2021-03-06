////// DATA ////////////////////////////////////////////////////////////////////
/// Current data
let slaveName = ""; // This comes from the cloud save data and retrieved with "getSlaveDetailStorage()"
let masterName = ""; // This comes from the cloud saved data and retrieved with "getMasterDetailStorage()"
let foundSlaveJsonArrayIndex = 0; // This comes from an API Search
let slaveCSSObject = {}; // This comes from the API to be sent to the content.JS

/// Server URLS
const SLAVE_URL = "https://prnkstrserver.herokuapp.com/users.json";
const MASTER_URL = "https://prnkstrserver.herokuapp.com/masters.json";

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

/// Iterating through the API to find a slave match. It then returns the ID number to 'foundSlaveJsonArrayIndex'
const slaveDataGetter = function() {
	$.getJSON( SLAVE_URL )
		.done( ( response ) => {
			for ( let i = 0; i < response.length; i += 1 ) {
				// Iterating over Users.json response looking for match against local storage 'slaveName'
				if ( slaveName === '"' + response[ i ].name + '"' ) {
					// console.log( "Match found! Array possition " + response[ i ] );
					foundSlaveJsonArrayIndex = [ i ] // this remebers the ID of the slave found
				}
			}
		} )
		.done( ( response ) => {
			console.log( response );
			slaveCSSObject = {
				"fill_murray": response[ foundSlaveJsonArrayIndex ].fill_murray,
				"place_cage": response[ foundSlaveJsonArrayIndex ].place_cage,
				"custom_header": response[ foundSlaveJsonArrayIndex ].custom_header,
				"custom_header_text": response[ foundSlaveJsonArrayIndex ].custom_header_text,
				"paragraph_background": response[ foundSlaveJsonArrayIndex ].paragraph_background,
				"paragraph_color": response[ foundSlaveJsonArrayIndex ].paragraph_color,
				"snap": response[ foundSlaveJsonArrayIndex ].snap,
				"stranger_things": response[ foundSlaveJsonArrayIndex ].stranger_things,
				"page_flip": response[ foundSlaveJsonArrayIndex ].page_flip,
				"otherside": response[ foundSlaveJsonArrayIndex ].otherside,
				"marquee": response[ foundSlaveJsonArrayIndex ].marquee,
				"marquee_element": response[ foundSlaveJsonArrayIndex ].marquee_element,
				"marquee_speed": response[ foundSlaveJsonArrayIndex ].marquee_speed,
				"unicorn_mode": response[ foundSlaveJsonArrayIndex ].unicorn_mode,
				"word_swapper": response[ foundSlaveJsonArrayIndex ].word_swapper,
				"existing_word": response[ foundSlaveJsonArrayIndex ].existing_word,
				"new_word": response[ foundSlaveJsonArrayIndex ].new_word,
				"hidden_video": response[ foundSlaveJsonArrayIndex ].hidden_video,
				"hidden_video_url": response[ foundSlaveJsonArrayIndex ].hidden_video_url,
				"hidden_video_element": response[ foundSlaveJsonArrayIndex ].hidden_video_element
				,
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
		chrome.tabs.query( { active: true }, function( tabs ) {
			chrome.tabs.sendMessage( tabs[ 0 ].id, slaveCSSObject );
		} );
	}
} )
