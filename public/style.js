/* General Styles */
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f4f4f9;
}

/* Header Styles */
header {
  background-color: #0044cc;
  color: white;
  padding: 1rem;
  text-align: center;
}

/* Main Content Styles */
main {
  padding: 1rem;
}

/* Heading Styles */
h1, h2 {
  margin: 0.5rem 0;
}

.row{
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap:30vh;
}

/* Transaction History Styles */
#transaction-history ul {
  list-style: none;
  padding: 0;
}

#transaction-history li {
  padding: 0.5rem;
  margin: 0.5rem 0;
  background: #e0e0e0;
  border-left: 5px solid green;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

#transaction-history li.debit {
  border-color: red;
}

/* Hover Effect for List Items */
#transaction-history li:hover {
  background-color: #d1e7dd; /* Light green for credit */
  transform: scale(1.02); /* Slight zoom */
}

/* Button Styles */
button {
  background-color: #0044cc;
  color: white;
  border: none;
  cursor: pointer;
  padding: 0.7rem;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

button:hover {
  background-color: #0056b3; /* Darker blue */
  transform: scale(1.05); /* Slight zoom effect */
}

button:active {
  transform: scale(0.95); /* Pressed effect */
  transition: transform 0.1s;
}

/* Input and Form Styles */
form input, form select, form button {
  display: block;
  width: 100%;
  margin: 0.5rem 0;
  padding: 0.5rem;
  transition: box-shadow 0.3s ease;
}

form input:focus, form select:focus {
  box-shadow: 0 0 5px #0044cc; /* Glow effect on focus */
  outline: none;
}

/* Footer Styles */
footer {
  text-align: center;
  padding: 1rem;
  background: #ccc;
}

/* Fade-In Animation on Page Load */
.fade-in {
  opacity: 0;
  transform: translateY(20px);
  animation: fadeIn 0.8s ease forwards;
}

@keyframes fadeIn {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Highlight New Transaction */
.highlight {
  background-color: #ffeeba; /* Light yellow */
  transition: background-color 1s ease;
}

.highlight.fade-out {
  background-color: #e0e0e0; /* Default background */
}

/* Slide-In Animation for List Items */
@keyframes slideIn {
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

#transactions li {
  animation: slideIn 0.5s ease;
}

/* Button Bounce Effect */
@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
}

button:hover {
  animation: bounce 1s;
}
