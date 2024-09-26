document.addEventListener('DOMContentLoaded', function() {
    // Set date range for dob input
    setDobRange();
    // Add table headers once page is loaded
    addTableHeaders();
    // Display any stored entries in the table
    renderTable();
});

// When the form is submitted
document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent page from refreshing when form is submitted

    // Get all form values
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var dob = document.getElementById('dob').value;
    var termsAccepted = document.getElementById('terms').checked ? 'true' : 'false';

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

    // Get any existing entries or start a new array
    var entries = JSON.parse(localStorage.getItem('entries')) || [];

    // Add the new entry
    entries.push({
        name: name,
        email: email,
        password: password,
        dob: dob,
        termsAccepted: termsAccepted
    });

    // Store updated entries back to localStorage
    localStorage.setItem('entries', JSON.stringify(entries));

    // Reset the form after submission
    document.getElementById('registrationForm').reset();

    // Re-render the table with the new entry included
    renderTable();
});

// This adds the headers to the table
function addTableHeaders() {
    var tableHead = document.querySelector('#usersTable thead');
    var headerRow = document.createElement('tr');

    // Table column names
    var headers = ['Name', 'Email', 'Password', 'Dob', 'Accepted terms?'];
    for (var i = 0; i < headers.length; i++) {
        var th = document.createElement('th');
        th.textContent = headers[i];
        headerRow.appendChild(th);
    }

    tableHead.appendChild(headerRow);
}

// This function shows all saved entries from localStorage in the table
function renderTable() {
    var tableBody = document.querySelector('#usersTable tbody');
    tableBody.innerHTML = ''; // Clear the table body first
    var storedEntries = JSON.parse(localStorage.getItem('entries')) || []; // Get entries or empty array if none

    // Loop through each stored entry and add a row in the table
    for (var i = 0; i < storedEntries.length; i++) {
        var entry = storedEntries[i];
        var newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${entry.name}</td>
            <td>${entry.email}</td>
            <td>${entry.password}</td>
            <td>${entry.dob}</td>
            <td>${entry.termsAccepted}</td>
        `;
        tableBody.appendChild(newRow);
    }
}

// Set the range for the date of birth input (18-55 years old)
function setDobRange() {
    var dobInput = document.getElementById('dob');
    var today = new Date();
    var maxDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
    var minDate = new Date(today.getFullYear() - 55, today.getMonth(), today.getDate());
    dobInput.setAttribute('max', maxDate.toISOString().split('T')[0]);
    dobInput.setAttribute('min', minDate.toISOString().split('T')[0]);
}

// Check if the age is between 18 and 55 years old
function validateAge(dob) {
    var today = new Date();
    var birthDate = new Date(dob);
    var age = today.getFullYear() - birthDate.getFullYear();
    var monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age >= 18 && age <= 55;
}

// Check if the email is valid
function validateEmail(email) {
    var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}
