document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('eventForm');
    const nameInput = document.getElementById('event-name');
    const budgetInput = document.getElementById('event-budget');


    document.getElementById("eventForm").addEventListener("submit", async function (e) {
        e.preventDefault();
    
        const name = document.getElementById("event-name").value.trim();
        const budget = document.getElementById("event-budget").value.trim();
    
        // Basic validation
        if (!name || !budget || isNaN(budget) || parseFloat(budget) <= 0) {
            alert("Please enter a valid event name and a positive budget.");
            return;
        }
    
        try {
            const response = await fetch("/events", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name, budget })
            });
    
            const result = await response.json();
    
            if (response.ok) {
                console.log("✅ Event added successfully:", result);
                window.location.href = "events.html"; // Redirect to events page
            } else {
                console.error("❌ Failed to add event:", result);
                alert(result.error || "Something went wrong. Please try again.");
            }
        } catch (error) {
            console.error("❌ Network error:", error);
            alert("Failed to connect to the server.");
        }
    });
    
});

function logout() {
    localStorage.clear();
    window.location.href = 'login.html';
  }