console.log("Popup says hello");

browser.storage.local.get().then(function (result)) {
  let results = [];

  for (const key of Object.keys(result)) {
    results.push(result);
  }
}

let site_info = document.getElementsById("unread_ID")

site_info.getElementsByClassName("unread_class")[0].textContent = results["Unreads"];