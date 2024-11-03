// contentScript.js

// Display a blocking message
document.body.innerHTML = `
    <div style="display:flex;flex-direction:column;justify-content:center;align-items:center;height:100vh;background-color:#FFFFFF;color:#13294B;">
        <h1 style="font-size:2em;color:#4B9CD3;">Time's Up!</h1>
        <p>You have reached your time limit for this website.</p>
        <button id="unblockButton" style="padding:10px 20px;font-size:1em;color:white;background-color:#4B9CD3;border:none;border-radius:5px;cursor:pointer;">Request More Time</button>
    </div>
`;

// Optional: Add functionality to the "Request More Time" button
document.getElementById('unblockButton').addEventListener('click', () => {
    alert('You can manage your time limits in the Linear extension.');
});
