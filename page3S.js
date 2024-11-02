// Fetch the usage data and display it
chrome.storage.local.get(['websiteUsage'], function(data) {
    const usageData = data.websiteUsage || [];
    const tbody = document.querySelector('#resultsTable tbody');

    if (usageData.length === 0) {
        tbody.innerHTML = '<tr><td colspan="2">No data available.</td></tr>';
        return;
    }

    usageData.forEach(site => {
        const row = document.createElement('tr');

        const websiteCell = document.createElement('td');
        websiteCell.textContent = site.url;
        row.appendChild(websiteCell);

        const timeCell = document.createElement('td');
        timeCell.textContent = site.timeSpent.toFixed(2);
        row.appendChild(timeCell);

        tbody.appendChild(row);
    });
});
