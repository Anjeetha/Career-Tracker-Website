const applications = [
    {
        company: "Google",
        role: "Data Analyst",
        date: "2026-08-15",
        status: "Interview"
    },
    {
        company: "Microsoft",
        role: "Software Engineer",
        date: "2026-08-12",
        status: "Applied"
    },
    {
        company: "Citi",
        role: "Data Analyst",
        date: "2026-08-10",
        status: "Rejected"
    },
    {
        company: "Accenture",
        role: "Associate Software Engineer",
        date: "2026-08-08",
        status: "Offer"
    }
];

const applicationList = document.getElementById("applicationList");

function displayApplications(data) {

    applicationList.innerHTML = "";

    data.forEach(application => {

        const applicationCard = document.createElement("div");

        applicationCard.className = "application-card";

        applicationCard.innerHTML = `
            <div>
                <h3>${application.company}</h3>
                <p>${application.role}</p>
            </div>

            <div>
                <p>${application.date}</p>
                <strong>${application.status}</strong>
            </div>
        `;

        applicationList.appendChild(applicationCard);
    });
}

displayApplications(applications);
// Modal elements
const addJobBtn = document.getElementById("addJobBtn");
const jobModal = document.getElementById("jobModal");
const cancelBtn = document.getElementById("cancelBtn");

// Open modal
addJobBtn.addEventListener("click", () => {
    jobModal.style.display = "flex";
});

// Close modal
cancelBtn.addEventListener("click", () => {
    jobModal.style.display = "none";
});

// Close modal when clicking outside the form
jobModal.addEventListener("click", (event) => {
    if (event.target === jobModal) {
        jobModal.style.display = "none";
    }
});
// Save application
const saveJobBtn = document.getElementById("saveJobBtn");

const companyInput = document.getElementById("companyInput");
const roleInput = document.getElementById("roleInput");
const dateInput = document.getElementById("dateInput");
const statusInput = document.getElementById("statusInput");

const totalApplications = document.getElementById("totalApplications");
const interviews = document.getElementById("interviews");
const offers = document.getElementById("offers");
const rejected = document.getElementById("rejected");

function updateKPIs() {
    totalApplications.textContent = applications.length;

    interviews.textContent =
        applications.filter(app => app.status === "Interview").length;

    offers.textContent =
        applications.filter(app => app.status === "Offer").length;

    rejected.textContent =
        applications.filter(app => app.status === "Rejected").length;
}

saveJobBtn.addEventListener("click", () => {

    const company = companyInput.value.trim();
    const role = roleInput.value.trim();
    const date = dateInput.value;
    const status = statusInput.value;

    if (company === "" || role === "" || date === "") {
        alert("Please fill in all fields.");
        return;
    }

    applications.push({
        company: company,
        role: role,
        date: date,
        status: status
    });

    displayApplications(applications);
    updateKPIs();

    companyInput.value = "";
    roleInput.value = "";
    dateInput.value = "";
    statusInput.value = "Applied";

    jobModal.style.display = "none";
});

// Show correct KPI values when page loads
updateKPIs();
// Search applications
const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("input", () => {
    const searchText = searchInput.value.toLowerCase();

    const filteredApplications = applications.filter(application =>
        application.company.toLowerCase().includes(searchText) ||
        application.role.toLowerCase().includes(searchText) ||
        application.status.toLowerCase().includes(searchText)
    );

    displayApplications(filteredApplications);
});