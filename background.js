// background.js

let siteData = {};
let blockedSites = {};

// Function to extract the root domain
function extractRootDomain(hostname) {
  const parts = hostname.split('.').reverse();
  if (parts.length >= 2) {
    return parts[1] + '.' + parts[0];
  }
  return hostname;
}

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ siteData: {}, blockedSites: {} });
});

// Listen for tab activation and updates
chrome.tabs.onActivated.addListener((activeInfo) => {
  trackActiveTab(activeInfo.tabId);
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (tab.active) {
    trackActiveTab(tabId);
  }
});

function trackActiveTab(tabId) {
  chrome.tabs.get(tabId, (tab) => {
    if (!tab || !tab.url || !tab.url.startsWith('http')) return;

    const url = new URL(tab.url);
    const domain = extractRootDomain(url.hostname);

    // Only track if the domain is in blockedSites
    chrome.storage.local.get(['blockedSites', 'siteData'], (data) => {
      blockedSites = data.blockedSites || {};
      siteData = data.siteData || {};

      if (blockedSites[domain]) {
        // Start tracking time
        let startTime = Date.now();

        // Clear previous interval if any
        if (siteData[domain] && siteData[domain].intervalId) {
          clearInterval(siteData[domain].intervalId);
        }

        // Initialize site data if not present
        siteData[domain] = siteData[domain] || { totalTime: 0, intervalId: null, unblocked: false, lastDate: new Date().toDateString() };

        // Set an interval to update time spent every second
        const intervalId = setInterval(() => {
          const currentTime = Date.now();
          const timeSpent = (currentTime - startTime) / 1000 / 60; // time in minutes
          startTime = currentTime; // Update startTime for the next interval

          // Check if a new day has started
          const currentDate = new Date().toDateString();
          if (siteData[domain].lastDate !== currentDate) {
            // Reset data for the new day
            siteData[domain].totalTime = 0;
            siteData[domain].unblocked = false;
            siteData[domain].lastDate = currentDate;
          }

          // If the site has been unblocked by the user, do not track time
          if (siteData[domain].unblocked) {
            clearInterval(intervalId);
            siteData[domain].intervalId = null;
            chrome.storage.local.set({ siteData });
            return;
          }

          // Update time spent
          siteData[domain].totalTime += timeSpent;

          // Check if time limit exceeded
          if (siteData[domain].totalTime >= blockedSites[domain].timeLimit) {
            // Block the website
            blockWebsite(domain);
            clearInterval(intervalId);
            siteData[domain].intervalId = null;
          }

          // Save updated data
          chrome.storage.local.set({ siteData });
        }, 1000); // Update every second

        // Store interval ID for clearing later
        siteData[domain].intervalId = intervalId;

        // Save interval ID
        chrome.storage.local.set({ siteData });
      }
    });
  });
}

// Block the website by injecting a content script
function blockWebsite(domain) {
  chrome.tabs.query({}, (tabs) => {
    tabs.forEach((tab) => {
      if (tab.url && extractRootDomain(new URL(tab.url).hostname) === domain) {
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          files: ['contentScript.js']
        });
      }
    });
  });
}

// Listen for messages from content scripts
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'unblockSite' && sender.tab) {
    const url = new URL(sender.tab.url);
    const domain = extractRootDomain(url.hostname);

    // Set unblocked flag to true
    if (siteData[domain]) {
      siteData[domain].unblocked = true;
      siteData[domain].intervalId && clearInterval(siteData[domain].intervalId);
      siteData[domain].intervalId = null;

      // Save the updated data
      chrome.storage.local.set({ siteData }, () => {
        // Reload the tab to remove the block
        chrome.tabs.reload(sender.tab.id);
      });
    }
  }
});
