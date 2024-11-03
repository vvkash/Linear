// Event listener for the "Accept" button
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

// Event listener for the "Decline" button
document.getElementById('declinePermission').addEventListener('click', function() {
  alert('You have declined the permission request.');
});

// Adding site functionality
document.getElementById("addSite").addEventListener("click", () => {
  const website = document.getElementById("website").value;
  const timeLimit = parseInt(document.getElementById("timeLimit").value);

  chrome.storage.local.get({ sites: {} }, (data) => {
      const sites = data.sites;
      sites[website] = { timeSpent: 0, timeLimit: timeLimit };
      chrome.storage.local.set({ sites });
  });

  document.getElementById("siteList").innerHTML += `<li>${website} - ${timeLimit} minutes</li>`;
});

// Functionality to create moving dots in the background
const numDots = 20; // Number of dots to create
const backgroundDots = document.createElement('div');
backgroundDots.classList.add('background-dots');
document.body.appendChild(backgroundDots);

for (let i = 0; i < numDots; i++) {
  const dot = document.createElement('div');
  dot.classList.add('dot');
  dot.style.width = `${Math.random() * 10 + 5}px`; // Random size between 5 and 15 pixels
  dot.style.height = dot.style.width; // Make it a circle
  dot.style.top = `${Math.random() * 100}vh`; // Random vertical position
  dot.style.left = `${Math.random() * 100}vw`; // Random horizontal position

  // Set random animation duration
  dot.style.animationDuration = `${Math.random() * 4 + 4}s`; // Random between 4s and 8s
  dot.style.opacity = Math.random(); // Random opacity

  backgroundDots.appendChild(dot);
}
