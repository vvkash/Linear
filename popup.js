document.getElementById("addSite").addEventListener("click", () => {
    const website = document.getElementById("website").value;
    const timeLimit = parseInt(document.getElementById("timeLimit").value);
  
    chrome.storage.local.get({ sites: {} }, (data) => {
      const sites = data.sites;
      sites[website] = { timeSpent: 0, timeLimit: timeLimit };
      chrome.storage.local.set({ sites });
    });
  
    document.getElementById("siteList").innerHTML += `<li>${website} - ${timeLimit} minutes</li>`;
  });
  