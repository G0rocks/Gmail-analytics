console.log("Extension enabled");

//Number of unread emails
let unreads = 0;

browser.storage.local.set({["Unreads"]: unreads})