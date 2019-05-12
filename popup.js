console.log('Testing pop-up');

const getSlaveName = function() { return $('#slaveName').val() }

const getMasterName = function() { return $('#yourUserName').val() }

/////// This is how you save data to cloud
const setSlaveDetail = function() {
  chrome.storage.sync.set({"slaveName": '"' + getSlaveName() + '"'}, function() {
  console.log('Value is set to ' + getSlaveName());
 });
}
const setMasterDetail = function() {
  chrome.storage.sync.set({"masterName": '"' + getMasterName() + '"'}, function() {
  console.log('Value is set to ' + getMasterName());
 });
}

/////// This is how you retrieve data from storage
const getSlaveDetail = function() {
  chrome.storage.sync.get(["slaveName"], function(result) {
  console.log('Value currently is ' + result.slaveName );
  });
}
const getMasterDetail = function() {
  chrome.storage.sync.get(["masterName"], function(result) {
  console.log('Value currently is ' + result.masterName );
  });
}

  $('#submit').on("click", function() {
    if ((getMasterName() && getSlaveName()) === "") {
      $('#errorMessage').text('PLEASE COMPLETE ALL OF THE FIELDS')
    } else {
      $('#errorMessage').text('').text('CONNECTED').css('color','green');
      setSlaveDetail();
      setMasterDetail();
    }
  });

  // $("#submit").click(function() {
  //       chrome.storage.sync.set({"myKey": "testPrefs"},function(){
  //        alert("object stored");
  // })
  //     chrome.storage.sync.get("myKey",function(obj){
  //         alert(obj.myKey);
  //     })
  // });
