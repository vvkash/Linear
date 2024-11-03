// contentScript.js

// Display a blocking message
document.body.innerHTML = `
    <div style="display:flex;flex-direction:column;justify-content:center;align-items:center;height:100vh;background-color:#FFFFFF;color:#13294B;">
        <h1 style="font-size:2.5em;color:#4B9CD3;">Time's Up!</h1>
        <p style="font-size:1.2em;">You have reached your time limit for this website.</p>
        <button id="unblockButton" style="padding:15px 30px;font-size:1.2em;color:white;background-color:#4B9CD3;border:none;border-radius:5px;cursor:pointer;">Continue Anyway</button>
    </div>
`;

// Add functionality to the "Continue Anyway" button
document.getElementById('unblockButton').addEventListener('click', () => {
  // Send a message to the background script to unblock the site
  chrome.runtime.sendMessage({ action: 'unblockSite' });
});
