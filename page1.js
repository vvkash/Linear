document.getElementById('grantPermission').addEventListener('click', function() {
    chrome.permissions.request({
      permissions: ['history']
    }, function(granted) {
      if (granted) {
        chrome.storage.local.set({ setupCompleted: true }, () => {
          window.location.href = 'page2.html';
        });
      } else {
        alert('Permission is required to proceed.');
      }
    });
  });
  