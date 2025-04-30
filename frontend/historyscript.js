// Fetch user history data from the backend
fetch('http://localhost:8080/api/history')  // Change URL as per your API
  .then(response => response.json())
  .then(data => {
    // Format the data (if needed)
    const formattedData = data.map(item => {
      const formattedTime = formatTime(item.action_time); // Format time to include seconds
      return {
        ...item,
        action_time: formattedTime
      };
    });
    // Display the formatted data in the table
    displayHistoryData(formattedData);
  })
  .catch(err => {
    console.error('Error fetching data:', err);
    document.getElementById('history-data').innerHTML = '<tr><td colspan="4">Error fetching data. Please try again later.</td></tr>';
  });

// Function to format time to include seconds
function formatTime(time) {
  const [hours, minutes, seconds] = time.split(':');
  return `${hours}:${minutes}:${seconds}`; // Ensures the time is in HH:MM:SS format
}

// Function to display the data in the table
function displayHistoryData(data) {
  const tbody = document.getElementById('history-data');
  tbody.innerHTML = ''; // Clear previous rows

  data.forEach(item => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.username}</td>
      <td>${item.feature_used}</td>
      <td>${item.action_date}</td>
      <td>${item.action_time}</td>
    `;
    tbody.appendChild(row);
  });
}

function toggleMenu() {
  let sidebar = document.getElementById("sidebar");
  sidebar.classList.toggle("active");
}
function logout() {
  localStorage.clear();
  window.location.href = 'login.html';
}