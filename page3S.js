// Toggle dropdown visibility when button is clicked
document.getElementById('dropdownToggle').addEventListener('click', () => {
    const usageData = document.getElementById('usageData');
    usageData.style.display = usageData.style.display === 'block' ? 'none' : 'block';
});

// Fetch the usage data and display it
chrome.storage.local.get(['websiteUsage'], function(data) {
    const usageData = data.websiteUsage || {};
    const tbody = document.querySelector('#usageTable tbody');

    if (Object.keys(usageData).length === 0) {
        tbody.innerHTML = '<tr><td colspan="2">No data available.</td></tr>';
        return;
    }

    Object.keys(usageData).forEach(site => {
        const row = document.createElement('tr');

        const websiteCell = document.createElement('td');
        websiteCell.textContent = site;
        row.appendChild(websiteCell);

        const timeCell = document.createElement('td');
        timeCell.textContent = `${usageData[site].toFixed(2)} min`;
        row.appendChild(timeCell);

        tbody.appendChild(row);
    });
});
