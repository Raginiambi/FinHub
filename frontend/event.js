const role = localStorage.getItem('userRole');


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
        const eventRes = await fetch(`/events/${eventId}`);

        if (!eventRes.ok) {
            throw new Error("❌ Failed to fetch event details");
        }

        const event = await eventRes.json();
        console.log("✅ Event data received:", event);

        if (!event || !event.name) {
            console.error("❌ Event not found or missing data!");
            return;
        }

        // 🟢 Display event details
        document.getElementById("event-name").textContent = event.name;
        document.getElementById("current-balance").textContent = event.remaining;

        // 🟢 Fetch transactions
        console.log("📡 Fetching transactions for event ID:", eventId);
        const transactionsRes = await fetch(`/events/${eventId}/transactions`);

        if (!transactionsRes.ok) {
            throw new Error("❌ Failed to fetch transactions");
        }

        const transactions = await transactionsRes.json();
        console.log("✅ Transactions data received:", transactions);

        // 🟢 Display transactions
        const transactionsList = document.getElementById("transactions");
        transactionsList.innerHTML = ""; // Clear previous content

        if (transactions.length === 0) {
            transactionsList.innerHTML = "<li>No transactions yet.</li>";
        } else {
            transactions.forEach((tx, index) => {
                const li = document.createElement("li");
                li.textContent = `${index + 1}. ${tx.description} - $${tx.amount} (${tx.type})`;
                transactionsList.appendChild(li);
                console.log("✅ Transactions fetched from API:", transactions);
            });
        }
        

    } catch (error) {
        console.error("❌ Error loading event details:", error);
    }
});
if(role === 'admin'){
    const event_btn = document.querySelector(".add-button");
    event_btn.style.display = 'none';
}
document.querySelector(".add-button").addEventListener("click", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const eventId = urlParams.get("id");

    if (!eventId) {
        alert("❌ Error: No event ID found!");
        return;
    }

    window.location.href = `add-event-transaction.html?id=${eventId}`;
});


function toggleMenu() {
    let sidebar = document.getElementById("sidebar");
    sidebar.classList.toggle("active");
}
function logout() {
    localStorage.clear();
    window.location.href = 'login.html';
  }

