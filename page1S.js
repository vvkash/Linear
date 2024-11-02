document.getElementById('grantPermission').addEventListener('click', function() {
    // Request the 'history' permission
    chrome.permissions.request({
        permissions: ['history']
    }, function(granted) {
        if (granted) {
            // Redirect to the preferences page
            window.location.href = 'page2.html';
        } else {
            alert('Permission is required to proceed.');
        }
    });
});
