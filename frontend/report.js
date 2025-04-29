// JavaScript for handling report download
function downloadReport(period) {
    // Show loading message
    document.getElementById('loading').style.display = 'block';
  
    // Simulate delay for report generation
    setTimeout(() => {
      // Triggering the backend request for downloading the report
      const url = `/download-pdf-report?period=${period}`;
      window.location.href = url;  // Trigger the download
  
      // Hide loading message once the download starts
      document.getElementById('loading').style.display = 'none';
    }, 1000);  // Simulate loading time (1 second)
  }
  function toggleMenu() {
    let sidebar = document.getElementById("sidebar");
    sidebar.classList.toggle("active");
}
function logout() {
  localStorage.clear();
  window.location.href = 'login.html';
}
  