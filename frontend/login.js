let loginEmail = '';

function sendLogin() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  loginEmail = email;

  fetch('http://localhost:8080/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })
  .then(res => res.json())
  .then(data => {
    if (data.message === 'OTP sent to email') {
      document.getElementById('otp-section').style.display = 'block';
      alert('OTP sent to your email.');
    } else {
      alert(data.error || 'Login failed');
    }
  });
}




function verifyOtp() {
  const otp = document.getElementById('otp').value;

  fetch('http://localhost:8080/auth/verify-otp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: loginEmail, otp })
  })
  .then(res => res.json())
  .then(data => {
    if (data.message === 'OTP verified') {
      localStorage.setItem('userRole', data.role);
      localStorage.setItem('isLoggedIn', 'true');
      window.location.href = 'index.html';
    } else {
      alert(data.error || 'Invalid OTP');
    }
  });
}
