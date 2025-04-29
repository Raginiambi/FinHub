document.addEventListener("DOMContentLoaded", async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const eventId = urlParams.get("id");

    if (!eventId) {
        console.error("❌ No event ID found in URL.");
        return;
    }

    try {
        // 🟢 Fetch event details
        console.log("📡 Fetching event details for ID:", eventId);
        const eventRes = await fetch(`/api/events/${eventId}`);
        const event = await eventRes.json();

        if (!event || !event.name) {
            console.error("❌ Event not found!");
            return;
        }

        // Display event name and budget
        document.getElementById("event-name").textContent = event.name;
        document.getElementById("event-budget").textContent = `$${event.budget.toFixed(2)}`;

        // 🟢 Fetch transactions
        console.log("📡 Fetching transactions for event ID:", eventId);
        const transactionsRes = await fetch(`/api/events/${eventId}/transactions`);
        const transactions = await transactionsRes.json();

        const transactionsList = document.getElementById("transactions");
        transactionsList.innerHTML = ""; // Clear previous content

        let totalSpent = 0; // To calculate the remaining budget

        if (transactions.length === 0) {
            transactionsList.innerHTML = "<li>No transactions yet.</li>";
        } else {
            transactions.forEach((tx, index) => {
                const li = document.createElement("li");
                li.textContent = `${index + 1}. ${tx.description} - $${tx.amount} (${tx.type})`;
                transactionsList.appendChild(li);

                // 🟢 Calculate total spent (only debit transactions)
                if (tx.type === "debit") {
                    totalSpent += parseFloat(tx.amount);
                }
            });
        }

        // 🟢 Update balance dynamically
        const currentBalance = event.budget - totalSpent;
        document.getElementById("current-balance").textContent = `$${currentBalance.toFixed(2)}`;

    } catch (error) {
        console.error("❌ Error loading event details:", error);
    }

    // Add Event Transaction Button
    document.getElementById("add-transaction").addEventListener("click", () => {
        window.location.href = `/add-event-transaction.html?event_id=${eventId}`;
    });
});
function logout() {
    localStorage.clear();
    window.location.href = 'login.html';
  }