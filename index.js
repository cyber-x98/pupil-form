// js content
document.addEventListener('DOMContentLoaded', () => {
    setDobRange();
    renderTable();
});

document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const dob = document.getElementById('dob').value;
    const termsAccepted = document.getElementById('terms').checked ? 'True' : 'False';

    if (!validateAge(dob)) {
        alert('You must be between 18 and 55 years old to register.');
        return;
    }

    if (!validateEmail(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    let entries = JSON.parse(localStorage.getItem('entries')) || [];
    entries.push({
        name: name,
        email: email,
        password: password,
        dob: dob,
        termsAccepted: termsAccepted
    });
    localStorage.setItem('entries', JSON.stringify(entries));

    document.getElementById('registrationForm').reset();
    renderTable();
});

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

function renderTable() {
    const tableBody = document.querySelector('#usersTable tbody');
    tableBody.innerHTML = '';  // Clear previous entries
    const storedEntries = JSON.parse(localStorage.getItem('entries')) || [];

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


function validateAge(dob) {
    const today = new Date();
    const birthDate = new Date(dob);
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age >= 18 && age <= 55;
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}
