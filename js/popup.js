console.log( "popup.js running..." );

////// DATA
let masterID = 0
let masterName = {}
let masterIdGetterComplete = false;


/// Server URLS
const SLAVE_URL = "https://prnkstrserver.herokuapp.com/users.json";
const MASTER_URL = "https://prnkstrserver.herokuapp.com/masters.json";



const getSlaveName = function() {
	return $( "#slaveName" ).val()
}
const getMasterName = function() {
	return $( "#masterName" ).val()
}

/////// This is how you save data to cloud
const setSlaveDetail = function() {
	chrome.storage.sync.set( {
		"slaveName": '"' + getSlaveName() + '"'	}, function() {
			console.log( "Value is set to " + getSlaveName() );
	} );
}
const setMasterDetail = function() {
	chrome.storage.sync.set( { "masterName": '"' + getMasterName() + '"' }, function() {
		console.log( "Value is set to " + getMasterName() );
	} );
}

/////// This is how you retrieve data from storage
const getSlaveDetail = function() {
	chrome.storage.sync.get( [ "slaveName" ], function( result ) {
		console.log( "Value currently is " + result.slaveName );
	} );
}
const getMasterDetail = function() {
	chrome.storage.sync.get( [ "masterName" ], function( result ) {
		console.log( "Value currently is " + result.masterName );
	} );
}

/////// This is how you set the Slave and master in the DB
const updateSlaveDB = function() {
	$.ajax({
	 type: 'POST',
	 url: SLAVE_URL,
	 data: {user:{
		 "name": getSlaveName() ,
		 "master_id": masterID }
 }});
}


/////// Post to server on submit
$( "#submit" ).on( "click", async () => {
	await $.getJSON( MASTER_URL )
		.done( ( response ) => {
			response.map( async (res) => {
				let currentMasterName = await getMasterName()
				console.log("stage 1 master ID-->" + masterID);
				console.log( "MASTERIDGETTER response from the DB is " + res.name );
				console.log( "MASTERIDGETTER Current master input is " + currentMasterName );
				// Iterating over Users.json res looking for match against local storage 'slaveName'
				if ( currentMasterName ===  res.name ) {
					console.log( "Match found! ID number " + res.name + "and the id is " + res.id );
					masterID =  await res.id
				}
			})
		})
		.done( () => {
			$('#errorMessage').show();
		})

		console.log("Stage 2 master ID--->" + masterID );
		if ( ( getMasterName() && getSlaveName() ) === "" ) {
			$( "#errorMessage" ).text( "PLEASE COMPLETE ALL OF THE FIELDS" ).css( "color", "red" );
		} else if ( masterID === 0 ) {
			console.log( " this is current master ID " + masterID )
			$( "#errorMessage" ).text( "" ).text( "USERNAME DOES NOT EXIST" ).css( "color", "red" );
    } else if ( getSlaveName() === "" ) {
      $( "#errorMessage" ).text( "" ).text( "PLEASE ENTER SLAVE NAME")
		} else {
			$( "#errorMessage" ).text( "" ).text( "CONNECTED" ).css( "color", "green" );
			console.log("Stage 3 master ID--->" + masterID );
			setSlaveDetail();
			setMasterDetail();
			getMasterDetail();
			getSlaveDetail();
			updateSlaveDB();
			setTimeout(function(){ window.close(); }, 3000);
		}
 });
