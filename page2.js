// Function to load saved websites on startup
function loadSavedWebsites() {
    chrome.storage.local.get(['blockedSites'], (data) => {
      const blockedSites = data.blockedSites || {};
      const tableBody = document.querySelector('#websiteTable tbody');
      tableBody.innerHTML = ''; // Clear existing rows
  
      for (const [website, siteData] of Object.entries(blockedSites)) {
        const row = document.createElement('tr');
  
        // Create website cell
        const websiteCell = document.createElement('td');
        websiteCell.textContent = website;
        row.appendChild(websiteCell);
  
        // Create time limit cell
        const timeLimitCell = document.createElement('td');
        timeLimitCell.textContent = `${siteData.timeLimit} min`;
        row.appendChild(timeLimitCell);
  
        // Create actions cell
        const actionsCell = document.createElement('td');
  
        // Edit button
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.classList.add('action-button');
        editButton.addEventListener('click', () => editWebsite(website, siteData.timeLimit));
        actionsCell.appendChild(editButton);
  
        // Remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.classList.add('action-button');
        removeButton.addEventListener('click', () => removeWebsite(website));
        actionsCell.appendChild(removeButton);
  
        row.appendChild(actionsCell);
  
        tableBody.appendChild(row);
      }
    });
  }
  
  // Call the function on page load
  loadSavedWebsites();
  
  // Event listener for 'addSite' button
  document.getElementById('addSite').addEventListener('click', () => {
    const websiteInput = document.getElementById('website');
    const timeLimitInput = document.getElementById('timeLimit');
    const tableBody = document.querySelector('#websiteTable tbody');
  
    // Check if the table already has 5 rows
    if (tableBody.rows.length >= 5) {
      alert("You can only add up to 5 websites.");
      return;
    }
  
    // Get user input values
    let website = websiteInput.value.trim();
    const timeLimit = parseInt(timeLimitInput.value.trim());
  
    // Validate inputs
    if (!website || isNaN(timeLimit)) {
      alert("Please fill out both the website and time limit.");
      return;
    }
  
    // Normalize website URL
    if (!website.startsWith('http')) {
      website = 'http://' + website;
    }
  
    try {
      const url = new URL(website);
      website = extractRootDomain(url.hostname);
    } catch (error) {
      alert("Please enter a valid URL.");
      return;
    }
  
    // Save to storage
    chrome.storage.local.get(['blockedSites'], (data) => {
      const blockedSites = data.blockedSites || {};
      blockedSites[website] = { timeLimit: timeLimit };
      chrome.storage.local.set({ blockedSites }, () => {
        // Reload the table
        loadSavedWebsites();
      });
    });
  
    // Clear the input fields
    websiteInput.value = '';
    timeLimitInput.value = '';
  });
  
  // Toggle dropdown visibility when button is clicked
  document.getElementById('dropdownToggle').addEventListener('click', () => {
    const siteList = document.getElementById('siteList');
    siteList.style.display = siteList.style.display === 'block' ? 'none' : 'block';
  });
  
  // Event listener for "Save and Continue" button
  document.getElementById('savePreferences').addEventListener('click', () => {
    window.location.href = 'page3.html';
  });
  
  // Function to edit a website
  function editWebsite(website, currentTimeLimit) {
    const newTimeLimit = prompt(`Edit time limit for ${website}:`, currentTimeLimit);
    if (newTimeLimit !== null && !isNaN(parseInt(newTimeLimit))) {
      chrome.storage.local.get(['blockedSites'], (data) => {
        const blockedSites = data.blockedSites || {};
        blockedSites[website].timeLimit = parseInt(newTimeLimit);
        chrome.storage.local.set({ blockedSites }, () => {
          loadSavedWebsites();
        });
      });
    } else {
      alert('Invalid time limit.');
    }
  }
  
  // Function to remove a website
  function removeWebsite(website) {
    if (confirm(`Are you sure you want to remove ${website}?`)) {
      chrome.storage.local.get(['blockedSites'], (data) => {
        const blockedSites = data.blockedSites || {};
        delete blockedSites[website];
        chrome.storage.local.set({ blockedSites }, () => {
          loadSavedWebsites();
        });
      });
    }
  }
  
  // Helper function to extract root domain
  function extractRootDomain(hostname) {
    const parts = hostname.split('.').reverse();
    if (parts.length >= 2) {
      return parts[1] + '.' + parts[0];
    }
    return hostname;
  }
  