chrome.storage.local.get('setupCompleted', (data) => {
    if (data.setupCompleted) {
      window.location.href = 'page3.html';
    } else {
      window.location.href = 'page1.html';
    }
  });
  