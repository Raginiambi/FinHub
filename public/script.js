document.addEventListener("DOMContentLoaded", () => {
    const transactionForm = document.getElementById("transaction-form");
    const transactionHistory = document.getElementById("transactions");
  
    // Fetch existing transactions
    async function fetchTransactions() {
      const response = await fetch("/api/transactions");
      const transactions = await response.json();
  
      transactionHistory.innerHTML = transactions
        .map(
          (t) => `
        <li class="${t.type}">
          ${t.description} - $${t.amount}
        </li>`
        )
        .join("");
    }
  
    // Add new transaction
    transactionForm.addEventListener("submit", async (e) => {
      e.preventDefault();
  
      const description = document.getElementById("description").value;
      const amount = document.getElementById("amount").value;
      const type = document.getElementById("type").value;
  
      const response = await fetch("/api/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description, amount, type }),
      });
  
      if (response.ok) {
        fetchTransactions();
        transactionForm.reset();
      }
    });
  
    fetchTransactions();
  });

  // Example Chart.js integration
const ctx = document.getElementById('myChart').getContext('2d');
const chart = new Chart(ctx, {
  type: 'pie',
  data: {
    labels: ['Credits', 'Debits'],
    datasets: [{
      label: 'Transactions Overview',
      data: [300, 200], // Example values, dynamically replace with fetched data
      backgroundColor: ['#28a745', '#dc3545'],
    }],
  },
});

  
