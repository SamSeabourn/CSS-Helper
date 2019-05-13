
/////// Current data
let slaveName = "" // This comes from the cloud save data
let masterName = "" // This comes from the cloud saved data
let foundSlaveID = 0 // This comes from an API Search
let slaveCSSSettingsObject = {} // This comes from the API to be sent to the content.JS

/////// Server URLS
const slaveServer = "https://prnkstrserver.herokuapp.com/users.json"
const masterServer = "https://prnkstrserver.herokuapp.com/masters.json"


///// functions

///// Retrieving slave name from cloud storage
const getSlaveDetailStorage = function() {
  chrome.storage.sync.get(["slaveName"], function(result) {
  slaveName = ( result.slaveName );
  });
}
///// Retrieving master name from cloud storage
const getMasterDetailStorage = function() {
  chrome.storage.sync.get(["masterName"], function(result) {
  masterName = ( result.masterName );
  });
}

////// Itterating through the API to find a slave match. It then returns the ID number to 'foundSlaveID'
const slaveIDGetter = function() {
	$.ajax( slaveServer )
		.done( ( response ) => {
			var allSlavesObject = response
			for (var i = 0; i < allSlavesObject.length; i++) {
				console.log( "Iterating through, now on --> " + allSlavesObject[i].name )
				console.log( i )
				if ( slaveName === '"' + allSlavesObject[i].name + '"' ){
					console.log("match found id: " + i);
					foundSlaveID = i // this remebers the ID of the slave found
				}
			}
		})
	}
/////// Getting all of the Data from the API and compiling it into a single object
const slaveCSSSettingsGetter = function() {
	$.ajax( slaveServer )
		.done( ( response ) => {
			var x = response
			 slaveCSSSettingsObject = { // The lines below build the object
				 "fill_murray":  x[foundSlaveID].fill_murray ,
				 "placeCage": x[foundSlaveID].place_cage,
				 "custom_header": x[foundSlaveID].custom_header,
				 "custom_header_text": '"' + x[foundSlaveID].custom_header_text + '"'
			 }
			})
		}


chrome.tabs.onUpdated.addListener( function() {

	getMasterDetailStorage()
	getSlaveDetailStorage()
	slaveIDGetter()
	slaveCSSSettingsGetter()

		})
		.done( function() {
			chrome.tabs.query( {}, function( tabs ) {
				console.log( 'About to loop through all tabs and send the response to a listener.' );
				// slaveVariables.fillMurray = true;
				for ( var i = 0; i < tabs.length; i += 1 ) {
					chrome.tabs.sendMessage( tabs[ i ].id, slaveCSSSettingsObject );
				};
			});
		});
