console.log("Background.js start");

let currentTab = null;
 
browser.tabs.onActivated.addListener((event) => currentTab = event.tabId);

//---------------------------------------------------------------
//Functions. These should be moved to a dedicated library.js file or similar but I haven't figured out how yet.

// Function that grabs data from the gmail inbox site and stores in the extensions local storage
function saveData() {
  console.log("saveData start");

  //Number of unread emails
  let unreads = null;
  let readToday = null;
  let last_update = null;

  let test = browser.windows.getCurrent().then(
    function(value) { //console.log("testPromise success: " + value)
    return value; },
    function(error) { console.log("testfailed: " + error)
    return null; }
  );

  console.log("test: " + test)

  browser.storage.local.set({["Unreads"]: unreads})
  browser.storage.local.set({["Read_today"]: readToday})
  browser.storage.local.set({["test"]: test});

  last_update = new Date().toISOString().slice(0,10) + " " + new Date().toISOString().slice(11,16)
  browser.storage.local.set({["Last update"]: last_update})
}
//---------------------------------------------------------------


setInterval(updateAnalytics, 1000);

async function updateAnalytics() {
  if (!currentTab)
    return;
 
  let frames = null;
  try {
    frames = await browser.webNavigation.getAllFrames({ 'tabId': currentTab});
  } catch (error) {
    console.log(error);
  }
 
  let frame = frames.filter((frame) => frame.parentFrameId == -1)[0];

  if (frame.url != 'https://mail.google.com/mail/u/0/#inbox') {
    //Returning if the URL is not the gmail inbox
    return;
  }
  else { 
    console.log(frame.url + " is the correct URL, getting data");
    saveData();
  }
}

console.log("Background.js finished executing");