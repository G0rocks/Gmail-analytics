//console.log("Popup.js start");

async function get_unreads() {

  let unreads_promise = browser.storage.local.get(["Unreads"]);

  unreads = await unreads_promise.then(
    function(value) { console.log("unreads promise success: " + value["Unreads"])
    return value["Unreads"]; },
    function(error) { console.log("unreads promise failed: " + error)
    return null; }
  );

  return unreads;
}

async function set_popup_unreads(unreads){
  document.getElementById("unread_ID").innerHTML = "Unread: " + await unreads;
}

//unreads = get_unreads();

//set_popup_unreads(unreads);

//----------------------------------------------------------------------
//Test:

function getData() {

  let localStoragePromise = browser.storage.local.get();

  unreads = localStoragePromise.then(
    function(value) { //console.log("localStoragePromise success: " + value["Unreads"])
    return value["Unreads"]; },
    function(error) { console.log("localStoragePromise failed: " + error)
    return null; }
  );

  readToday = localStoragePromise.then(
    function(value) { //console.log("localStoragePromise success: " + value["Read Today"])
    return value["Read_Today"]; },
    function(error) { console.log("localStoragePromise failed: " + error)
    return null; }
  );

  lasteUpdate = localStoragePromise.then(
    function(value) { //console.log("localStoragePromise success: " + value["Last update"])
    return value["Last update"]; },
    function(error) { console.log("localStoragePromise failed: " + error)
    return null; }
  );

  let storage = {
    "Unreads": unreads,
    "readToday": readToday,
    "Last update": lasteUpdate
  };

  console.log("Storage: " + storage);

  return storage;
}

async function writePopupData(localData){
  document.getElementById("unread_ID").innerHTML = "Unread: " + await localData["Unreads"];
  document.getElementById("read_today_ID").innerHTML = "Read_today: " + await localData["readToday"];
  document.getElementById("last_update_ID").innerHTML = "Updated: " + await localData["Last update"];
}

let localData = getData();

console.log("LocalData: " + localData["readToday"]);

writePopupData(localData);

console.log("Popup.js finished executing");