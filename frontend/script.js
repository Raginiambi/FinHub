// Check login and role
const isLoggedIn = localStorage.getItem('isLoggedIn');
const role = localStorage.getItem('userRole');

if (!isLoggedIn) {
    // Not logged in, redirect to login
    window.location.href = 'login.html';
}
function logout() {
    localStorage.clear();
    window.location.href = 'login.html';
  }




document.addEventListener("DOMContentLoaded", () => {
    console.log("🚀 DOM fully loaded!");
    if (role === 'admin') {
        // Hide all Add/Edit/Delete buttons
        const actionButtons = document.querySelectorAll(
            ".add-btn, .edit-btn, .delete-btn"
        );
        actionButtons.forEach(btn => btn.style.display = "none");
    }
    const roleText = document.getElementById("user-role");
    if (roleText) roleText.textContent = `Logged in as: ${role}`;
    fetchTransactions();
    fetchEvents();
    const form = document.getElementById("transactionForm");
    if (form) {
        form.addEventListener("submit", async function (e) {
            e.preventDefault();

            const description = document.getElementById("description").value;
            const amount = document.getElementById("amount").value;
            const type = document.getElementById("type").value;
            const createdAt = document.getElementById("date").value;

            try {
                const response = await fetch("/transactions", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        description,
                        amount,
                        type,
                        created_at: createdAt,
                    }),
                });

                if (response.ok) {
                    alert("Transaction added successfully!");
                    window.location.href = "/"; // Redirect to homepage
                } else {
                    alert("Failed to add transaction.");
                }
            } catch (error) {
                console.error("Error:", error);
                alert("An error occurred.");
            }
        });
    }

   
    if (window.location.pathname.includes("edit.html")) {
        console.log("🛠 Edit page detected. Fetching transaction data...");
        loadEditTransaction();
        document.getElementById("edit-transaction-form").addEventListener("submit", updateTransaction);
    }
    const searchInput = document.getElementById("searchBar");
    const transactionList = document.getElementById("transactionsList");
    
    if (!searchInput || !transactionList) {
        console.error("Search input or transaction list not found in the DOM.");
        return;
    }

    searchInput.addEventListener("input", function () {
        const query = searchInput.value.toLowerCase();
        const transactions = transactionList.getElementsByTagName("li");
        
        for (let i = 0; i < transactions.length; i++) {
            const transactionText = transactions[i].textContent.toLowerCase();
            if (transactionText.includes(query)) {
                transactions[i].style.display = "block";
            } else {
                transactions[i].style.display = "none";
            }
        }
    });

    const eventForm = document.getElementById("eventForm");
        if (eventForm) {
            eventForm.addEventListener("submit", handleEventSubmit);
        }
        
    
    

    

    // Attach event listeners only if the elements exist
    const transactionForm = document.getElementById("transactionForm");
    if (transactionForm) {
        transactionForm.addEventListener("submit", handleTransactionSubmit);
    } else {
        console.warn("⚠️ transactionForm not found in DOM!");
    }

 

    const eventTransactionForm = document.getElementById("add-event-transaction-form");
    if (eventTransactionForm) {
        eventTransactionForm.addEventListener("submit", handleEventTransactionSubmit);
    } else {
        console.warn("⚠️ addEventTransactionForm not found in DOM!");
    }
});

// ✅ Fetch Transactions and Display on Home Page
function fetchTransactions() {
    fetch('/transactions')
        .then(res => res.json())
        .then(data => {
            const list = document.getElementById("transactionsList");
            if (!list) {
                console.error("❌ transactionsList not found in HTML!");
                return;
            }

            list.innerHTML = "";
            if (data.length === 0) {
                list.innerHTML = "<p>No transactions found.</p>";
                return;
            }
         

            data.forEach(t => {
                let li = document.createElement("li");
                li.classList.add("transaction-item");
                const formattedDate = new Date(t.created_at).toLocaleDateString();
                li.innerHTML = `
                    <span>${t.description} - ₹${t.amount} (${t.type}): ${formattedDate}  </span>
                    <div class="transaction-actions">
                        <button onclick="redirectToEdit(${t.id})" class="edit-btn">✏️</button>
                        <button onclick="deleteTransaction(${t.id})" class="delete-btn">🗑</button>
                    </div>`;
                list.appendChild(li);
            });
            if (role === 'admin') {
                document.querySelectorAll(".edit-btn, .delete-btn").forEach(btn => {
                    btn.style.display = "none";
                });
            }
            

            updateTotalBalance(data);
        })
        .catch(err => console.error("❌ Error fetching transactions:", err));
}

function fetchEvents() {
    fetch('/events')
        .then(res => res.json())
        .then(data => {
            const list = document.getElementById("eventsList");
            if (!list) {
                console.error("❌ eventsList not found in HTML!");
                return;
            }
            if(role == "admin"){
                const event_add_btn = document.querySelector("#add-btn_event");
                event_add_btn.style.display = "none";
            }

            list.innerHTML = "";
            if (data.length === 0) {
                list.innerHTML = "<p>No events found.</p>";
                return;
            }

            data.forEach(event => {
                let li = document.createElement("li");
                li.classList.add('event-item');
                li.innerHTML = `
                    <span class="event-name" onclick = "window.location.href='event.html?id=${event.id}'">${event.name} - ₹${event.budget}</span>
                    <button class="delete-event-btn" onclick="deleteEvent(${event.id})">🗑</button>
                `;
                
                // li.addEventListener("click", () => {
                //     window.location.href = `event.html?id=${event.id}`;
                // });

                list.appendChild(li);
            });
        })
        .catch(err => console.error("❌ Error fetching events:", err));
}
function addTransaction(event) {
    event.preventDefault();

    const description = document.getElementById("description").value;
    const amount = document.getElementById("amount").value;
    const type = document.getElementById("type").value;
    const date = document.getElementById("date").value;

    fetch("/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description, amount, type, date }),
    })
    .then(() => {
        window.location.href = "/"; // ✅ Redirect to history page after adding
    })
    .catch((error) => console.error("⚠️ Error adding transaction:", error));
}

// ✅ Delete Event
function deleteEvent(eventId) {
    if (!confirm("Are you sure you want to delete this event?")) return;

    fetch(`/events/${eventId}`, { method: "DELETE" })
        .then(res => res.json())
        .then(data => {
            fetchEvents(); // Refresh the list after deletion
            console.log("✅ Event deleted:", data);
            
        })
        .catch(err => console.error("❌ Error deleting event:", err));
}









function handleTransactionSubmit(event) {
    event.preventDefault();

    const description = document.getElementById("description").value;
    const amount = document.getElementById("amount").value;
    const type = document.getElementById("type").value;

    fetch('/transactions', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description, amount, type })
    })
    .then(res => res.json())
    .then((data) => {
        if (data.error) {
            console.error("❌ Error adding transaction:", data.error);
        } else {
            console.log("✅ Transaction added:", data);
            fetchTransactions();  // Refresh transaction list immediately
            window.location.href = "index.html";
            
        }
    })
    .catch(err => console.error("❌ Error adding transaction:", err));
}



function handleEventSubmit(event) {
    event.preventDefault();

    console.log("🚀 Submitting event form");    
    const name = document.getElementById("event-name").value;
    const budget = parseFloat(document.getElementById("event-budget").value);

    if (!name || isNaN(budget) || budget <= 0) {
        alert("⚠ Please provide a valid event name and budget.");
        return;
    }

    console.log("📤 Sending Event Data:", { name, budget });

    fetch('/events', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, budget })
    })
    .then(res => res.json())
    .then(data => {
        console.log("✅ Event Added Response:", data);
        if (data.error) {
            console.error("❌ Error adding event:", data.error);
        } else {
            fetchEvents();  // Refresh event list
            window.location.href = "events.html"; // Redirect to event page
        }
    })
    .catch(err => console.error("❌ Error adding event:", err));
}



// ✅ Load Transaction Data for Editing
// function loadEditTransaction() {
//     const params = new URLSearchParams(window.location.search);
//     const transactionId = params.get("id");

//     if (!transactionId) {
//         console.error("❌ No transaction ID found in URL!");
//         return;
//     }

//     fetch(`/transaction/${transactionId}`)
//         .then(res => res.json())
//         .then(data => {
//             document.getElementById("edit-description").value = data.description || "";
//             document.getElementById("edit-amount").value = data.amount || "";
//             document.getElementById("edit-type").value = data.type || "credit";
//             document.getElementById("date").value = data.created_at ? data.created_at.split("T")[0] : "";
            
//         })
//         .catch(err => console.error("❌ Error loading transaction:", err));
// }
function loadEditTransaction() {
    const params = new URLSearchParams(window.location.search);
    const transactionId = params.get("id");

    if (!transactionId) {
        console.error("❌ No transaction ID found in URL!");
        return;
    }

    fetch(`/transaction/${transactionId}`)
        .then(res => {
            if (!res.ok) {
                throw new Error("Failed to fetch transaction details");
            }
            return res.json();
        })
        .then(data => {
            console.log("✅ Transaction data received:", data);

            // Ensure input fields exist before assigning values
            const descriptionInput = document.getElementById("edit-description");
            const amountInput = document.getElementById("edit-amount");
            const typeInput = document.getElementById("edit-type");
            const dateInput = document.getElementById("date");

            if (!descriptionInput || !amountInput || !typeInput || !dateInput) {
                console.error("❌ One or more form elements not found in edit.html!");
                return;
            }

            // Fill the form fields
            descriptionInput.value = data.description || "";
            amountInput.value = data.amount || "";
            typeInput.value = data.type || "credit";  // Default to credit if empty
            dateInput.value = data.created_at ? data.created_at.split("T")[0] : "";
        })
        .catch(err => console.error("❌ Error loading transaction:", err));
}

function updateTransaction(event) {
    event.preventDefault();

    const params = new URLSearchParams(window.location.search);
    const transactionId = params.get("id");

    if (!transactionId) {
        console.error("❌ No transaction ID found in URL!");
        return;
    }

    const updatedTransaction = {
        description: document.getElementById("edit-description").value,
        amount: parseFloat(document.getElementById("edit-amount").value),
        type: document.getElementById("edit-type").value,
        created_at: document.getElementById("date").value
    };

    console.log("🔄 Sending Update Request:", updatedTransaction);

    fetch(`/transaction/${transactionId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedTransaction)
    })
    .then(response => {
        console.log("📩 Response Status:", response.status);
        return response.json();
    })
    .then(data => {
        console.log("✅ Update Response:", data);
        window.location.href = "index.html";
    })
    .catch(err => console.error("❌ Error updating transaction:", err));
}

function deleteEvent(id) {
    if (!confirm("Are you sure you want to delete this event?")) return;

    fetch(`/events/${id}`, { method: "DELETE" })
        .then(() => fetchEvents()) // Refresh event list
        .catch(err => console.error("⚠️ Error deleting event:", err));
}


// // ✅ Delete Transaction
// function deleteTransaction(id) {
//     if (!confirm("Are you sure you want to delete this transaction?")) return;

//     fetch(`/transaction/${id}`, { method: "DELETE" })
//         .then(() => fetchTransactions())
//         .catch(err => console.error("❌ Error deleting transaction:", err));
// }
// ✅ Delete Transaction & Refresh History
function deleteTransaction(id) {
    if (!confirm("Are you sure you want to delete this transaction?")) return;

    fetch(`/transactions/${id}`, { method: "DELETE" })
        .then(() => fetchTransactions()) // ✅ Refresh transactions after deleting
        .catch((error) => console.error("⚠️ Error deleting transaction:", error));
}

// ✅ Update Total Balance
// function updateTotalBalance(transactions) {
//     let balance = transactions.reduce((acc, t) => {
//         return t.type === "credit" ? acc + parseFloat(t.amount) : acc - parseFloat(t.amount);
//     }, 0);

//     const balanceElement = document.getElementById("totalBalance");
//     if (balanceElement) {
//         balanceElement.textContent = `₹${balance.toFixed(2)}`;
//     } else {
//         console.error("❌ totalBalance element not found in HTML!");
//     }
// }
function updateTotalBalance(transactions) {
    let total = transactions.reduce((sum, tx) => 
        tx.type === "credit" ? sum + parseFloat(tx.amount) : sum - parseFloat(tx.amount), 
    0);

    document.getElementById("totalBalance").textContent = total.toFixed(2);
    
    showEmergencyNotification(total);
}
function showEmergencyNotification(balance) {
    const notification = document.getElementById("notification");

    if (!notification) return;

    if (balance <= 0) {
        notification.textContent = "⚠ Alert! Balance is Zero!";
        notification.classList.remove("hidden");
    } else if (balance <= 50) {
        notification.textContent = "⚠ Warning! Balance below ₹50!";
        notification.classList.remove("hidden");
    } else if (balance <= 100) {
        notification.textContent = "⚠ Caution! Balance below ₹100!";
        notification.classList.remove("hidden");
    } else {
        notification.classList.add("hidden");
        return;
    }

    setTimeout(() => {
        notification.classList.add("hidden");
    }, 5000);
}


// ✅ Redirect to Edit Page
function redirectToEdit(id) {
    window.location.href = `edit.html?id=${id}`;
}

function toggleMenu() {
    let sidebar = document.getElementById("sidebar");
    sidebar.classList.toggle("active");
}

