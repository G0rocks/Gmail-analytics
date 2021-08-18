console.log("Popup.js start");

async function get_unreads() {

  let unreads_promise = browser.storage.local.get(["Unreads"]);

  unreads = await unreads_promise.then(
    function(value) { console.log("unreads promise success: " + value["Unreads"])
    return value["Unreads"]; },
    function(error) { console.log("unreads promise failed: " + error)
    return NaN; }
  );

  console.log("Unreads: " + unreads);

  return unreads;
}

async function set_popup_unreads(unreads){
  document.getElementById("unread_ID").innerHTML = "Unread: " + await unreads;
}

unreads = get_unreads();

set_popup_unreads(unreads);

console.log("Popup.js finished executing");
