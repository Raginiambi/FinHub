


document.addEventListener("DOMContentLoaded", async function () {
    const ctx = document.getElementById("financeChart")?.getContext("2d");
    if (!ctx) return console.error("Canvas with id 'financeChart' not found!");

    try {
        const response = await fetch("/api/finance-summary");
        const data = await response.json();

        const labels = data.map(item => item.description);
        const amounts = data.map(item => parseFloat(item.total_amount));

        const backgroundColors = labels.map(() =>
            `hsl(${Math.floor(Math.random() * 360)}, 70%, 70%)`
        );

        const financeData = {
            labels: labels,
            datasets: [{
                data: amounts,
                backgroundColor: backgroundColors,
                borderColor: "#222",
                borderWidth: 2,
                hoverOffset: 10,
                cutout: "15%"
            }]
        };

        const financeOptions = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: "right",
                    labels: {
                        color: "#fff",
                        font: {
                            size: 14
                        }
                    }
                },
                tooltip: {
                    enabled: true
                }
            },
            animation: {
                animateScale: true,
                animateRotate: true
            },
            elements: {
                arc: {
                    borderWidth: 3,
                    borderColor: "#222",
                    shadowColor: "#000",
                    shadowBlur: 10,
                    shadowOffsetX: 5,
                    shadowOffsetY: 5
                }
            }
        };

        new Chart(ctx, {
            type: "doughnut",
            data: financeData,
            options: financeOptions
        });

    } catch (err) {
        console.error("Failed to load finance data:", err.message);
    }
});

function toggleMenu() {
    let sidebar = document.getElementById("sidebar");
    sidebar.classList.toggle("active");
}
function logout() {
  localStorage.clear();
  window.location.href = 'login.html';
}