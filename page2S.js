document.getElementById('savePreferences').addEventListener('click', function() {
    // Collect the time limit
    const timeLimit = document.getElementById('timeLimit').value;

    // Collect the websites
    const websites = [];
    for (let i = 1; i <= 5; i++) {
        const site = document.getElementById('website' + i).value.trim();
        if (site) {
            websites.push(site);
        }
    }

    // Save preferences to Chrome storage
    chrome.storage.local.set({
        timeLimit: timeLimit,
        priorityWebsites: websites
    }, function() {
        // Redirect to the results page
        window.location.href = 'page3.html';
    });
});
