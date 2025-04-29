function toggleMenu() {
    let sidebar = document.getElementById("sidebar");
    sidebar.classList.toggle("active");
}
function logout() {
    localStorage.clear();
    window.location.href = 'login.html';
  }