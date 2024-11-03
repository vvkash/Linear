document.getElementById('addSite').addEventListener('click', () => {
  const websiteInput = document.getElementById('website');
  const timeLimitInput = document.getElementById('timeLimit');
  const tableBody = document.querySelector('#websiteTable tbody');

  // Check if the table already has 5 rows
  if (tableBody.rows.length >= 5) {
      alert("You can only add up to 5 websites.");
      return;
  }

  // Get user input values
  const website = websiteInput.value.trim();
  const timeLimit = timeLimitInput.value.trim();

  // Check that both inputs are filled out and validate URL
  if (!website || !timeLimit) {
      alert("Please fill out both the website and time limit.");
      return;
  }
  if (!isValidURL(website)) {
      alert("Please enter a valid URL.");
      return;
  }

  // Create a new table row
  const row = document.createElement('tr');

  // Create website cell
  const websiteCell = document.createElement('td');
  websiteCell.textContent = website;
  row.appendChild(websiteCell);

  // Create time limit cell
  const timeLimitCell = document.createElement('td');
  timeLimitCell.textContent = `${timeLimit} min`;
  row.appendChild(timeLimitCell);

  // Append the row to the table body
  tableBody.appendChild(row);

  // Clear the input fields
  websiteInput.value = '';
  timeLimitInput.value = '';
});

// Helper function to validate URL format
function isValidURL(string) {
  try {
      new URL(string);
      return true;
  } catch (error) {
      return false;
  }
}

// Toggle dropdown visibility when button is clicked
document.getElementById('dropdownToggle').addEventListener('click', () => {
  const siteList = document.getElementById('siteList');
  siteList.style.display = siteList.style.display === 'block' ? 'none' : 'block';
});
