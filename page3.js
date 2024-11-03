// Toggle dropdown visibility when button is clicked
document.getElementById('dropdownToggle').addEventListener('click', () => {
    const usageDataDiv = document.getElementById('usageData');
    usageDataDiv.style.display = usageDataDiv.style.display === 'block' ? 'none' : 'block';
  });
  
  // Fetch the usage data and display it
  chrome.storage.local.get(['siteData'], function(data) {
    const siteData = data.siteData || {};
    const tbody = document.querySelector('#usageTable tbody');
  
    if (Object.keys(siteData).length === 0) {
      tbody.innerHTML = '<tr><td colspan="3">No data available.</td></tr>';
      return;
    }
  
    tbody.innerHTML = ''; // Clear existing data
  
    for (const [site, data] of Object.entries(siteData)) {
      const row = document.createElement('tr');
  
      const websiteCell = document.createElement('td');
      websiteCell.textContent = site;
      row.appendChild(websiteCell);
  
      const timeCell = document.createElement('td');
      timeCell.textContent = `${data.totalTime.toFixed(2)} min`;
      row.appendChild(timeCell);
  
      // Calculate productivity score
      const productivityScore = getProductivityScore(site);
      const scoreCell = document.createElement('td');
      scoreCell.textContent = productivityScore;
      row.appendChild(scoreCell);
  
      tbody.appendChild(row);
    }
  });
  
  // Function to calculate productivity score
  function getProductivityScore(site) {
    // Simplified scoring: Lower scores for known unproductive sites
    const unproductiveSites = ['youtube.com', 'instagram.com', 'tiktok.com', 'facebook.com', 'twitter.com'];
    if (unproductiveSites.includes(site)) {
      return 'Low';
    } else {
      return 'High';
    }
  }
  
  // Event listener for "Edit Preferences" button
  document.getElementById('editPreferences').addEventListener('click', () => {
    window.location.href = 'page2.html';
  });
  