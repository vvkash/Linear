// background.js

let siteData = {};
let blockedSites = {};

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ siteData: {}, blockedSites: {} });
});

// Listen for tab updates to track time spent on websites
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.active && tab.url.startsWith('http')) {
    const url = new URL(tab.url);
    const domain = url.hostname.replace('www.', '');

    // Start tracking time
    startTracking(domain);
  }
});

// Start tracking time for a website
function startTracking(domain) {
  const startTime = Date.now();

  // Set an interval to update time spent every minute
  const intervalId = setInterval(() => {
    const currentTime = Date.now();
    const timeSpent = (currentTime - startTime) / 1000 / 60; // time in minutes

    chrome.storage.local.get(['siteData', 'blockedSites'], (data) => {
      siteData = data.siteData || {};
      blockedSites = data.blockedSites || {};

      // Update time spent
      siteData[domain] = (siteData[domain] || 0) + timeSpent;

      // Check if time limit exceeded
      if (blockedSites[domain] && siteData[domain] >= blockedSites[domain].timeLimit) {
        // Block the website
        blockWebsite(domain);
      }

      // Save updated data
      chrome.storage.local.set({ siteData });
    });
  }, 60000); // Update every minute

  // Clear the interval when the tab is closed or navigated away
  chrome.tabs.onRemoved.addListener(() => clearInterval(intervalId));
  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (tab.active && tab.url && !tab.url.includes(domain)) {
      clearInterval(intervalId);
    }
  });
}

// Block the website by injecting a content script
function blockWebsite(domain) {
  chrome.tabs.query({}, (tabs) => {
    tabs.forEach((tab) => {
      if (tab.url.includes(domain)) {
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          files: ['contentScript.js']
        });
      }
    });
  });
}
