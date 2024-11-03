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

// Functionality to create moving dots in the background
const numDots = 20; // Number of dots to create
const backgroundDots = document.querySelector('.background-dots');

for (let i = 0; i < numDots; i++) {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    dot.style.width = `${Math.random() * 10 + 5}px`;
    dot.style.height = dot.style.width;
    dot.style.top = `${Math.random() * 100}vh`;
    dot.style.left = `${Math.random() * 100}vw`;
    dot.style.animationDuration = `${Math.random() * 4 + 4}s`;
    dot.style.opacity = Math.random();
    backgroundDots.appendChild(dot);
}
