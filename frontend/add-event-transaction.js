document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const eventId = urlParams.get("id");

    if (!eventId) {
        console.error("❌ No event ID found in URL.");
        alert("Event ID missing! Redirecting to home...");
        window.location.href = "index.html";  // Redirect to home if ID is missing
        return;
    }

    const form = document.getElementById("add-event-transaction-form");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();  // Prevent default form submission

        const description = document.getElementById("description").value.trim();
        const amount = parseFloat(document.getElementById("amount").value);
        const type = document.getElementById("type").value;

        if (!description || isNaN(amount) || amount <= 0) {
            alert("⚠ Please enter valid description and amount!");
            return;
        }

        try {
            console.log("📡 Sending transaction data...");
            const response = await fetch(`/events/${eventId}/transactions`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ description, amount, type })
            });

            const result = await response.json();
            console.log("✅ Transaction Response:", result);

            if (response.ok) {
                alert("✅ Transaction added successfully!");
                window.location.href = `event.html?id=${eventId}`; // Redirect back
            } else {
                alert(`❌ Error: ${result.error}`);
            }
        } catch (error) {
            console.error("❌ Failed to add transaction:", error);
            alert("❌ Failed to add transaction. Try again!");
        }
    });
});
function logout() {
    localStorage.clear();
    window.location.href = 'login.html';
  }
