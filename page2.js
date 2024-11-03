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
        website = url.hostname.replace('www.', '');
    } catch (error) {
        alert("Please enter a valid URL.");
        return;
    }

    // Create a new table row
    const row = document.createElement('tr');

    // Create website cell
    const websiteCell = document.createElement('td');
    websiteCell.textContent = website;
    row.appendChild(websiteCell);

    // Create time limit cell
    const timeLimitCell = document.createElement('td');
    timeLimitCell.textContent = `${timeLimit} min`;
    row.appendChild(timeLimitCell);

    // Append the row to the table body
    tableBody.appendChild(row);

    // Save to storage
    chrome.storage.local.get(['blockedSites'], (data) => {
        const blockedSites = data.blockedSites || {};
        blockedSites[website] = { timeLimit: timeLimit };
        chrome.storage.local.set({ blockedSites });
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
