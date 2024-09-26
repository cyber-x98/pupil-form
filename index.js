document.addEventListener('DOMContentLoaded', () => {
    setDobRange();
    renderTable();
});

// Handle form submission
document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const dob = document.getElementById('dob').value;
    const termsAccepted = document.getElementById('terms').checked ? 'Yes' : 'No';

    // Validate age
    if (!validateAge(dob)) {
        alert('You must be between 18 and 55 years old to register.');
        return;
    }

    // Validate email
    if (!validateEmail(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    // Get existing entries or create empty array if none
    let entries = JSON.parse(localStorage.getItem('entries')) || [];

    // Add new entry to array
    entries.push({
        name: name,
        email: email,
        password: password,
        dob: dob,
        termsAccepted: termsAccepted
    });

    // Update localStorage with new entry list
    localStorage.setItem('entries', JSON.stringify(entries));

    // Clear form
    document.getElementById('registrationForm').reset();

    // Immediately update table
    renderTable();
});

// Set the date of birth range (18-55 years old)
function setDobRange() {
    const dobInput = document.getElementById('dob');
    const today = new Date();
    const maxDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
    const minDate = new Date(today.getFullYear() - 55, today.getMonth(), today.getDate());
    const maxDateFormatted = maxDate.toISOString().split('T')[0];
    const minDateFormatted = minDate.toISOString().split('T')[0];
    dobInput.setAttribute('min', minDateFormatted);
    dobInput.setAttribute('max', maxDateFormatted);
}

// Render the table from localStorage data
function renderTable() {
    const tableBody = document.querySelector('#usersTable tbody');
    tableBody.innerHTML = ''; // Clear previous content
    const storedEntries = JSON.parse(localStorage.getItem('entries')) || []; // Get entries from localStorage

    // Loop through stored entries and add them to the table
    storedEntries.forEach(entry => {
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td class="border px-4 py-2">${entry.name}</td>
            <td class="border px-4 py-2">${entry.email}</td>
            <td class="border px-4 py-2">${entry.password}</td>
            <td class="border px-4 py-2">${entry.dob}</td>
            <td class="border px-4 py-2">${entry.termsAccepted}</td>
        `;
        tableBody.appendChild(newRow);
    });
}

// Validate age (18-55 years old)
function validateAge(dob) {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age >= 18 && age <= 55;
}

// Validate email format using regex
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}
