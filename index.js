// Function to render data from localStorage into the table
        function renderTable() {
            const tableBody = document.querySelector('#usersTable tbody');
            tableBody.innerHTML = ''; // Clear existing table data

            // Get the stored data from localStorage
            const storedEntries = JSON.parse(localStorage.getItem('entries')) || [];

            // Loop through each entry and add it to the table
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

        // Function to validate the age
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

        // Render the table when the page loads
        document.addEventListener('DOMContentLoaded', renderTable);

        // Handle form submission
        document.getElementById('registrationForm').addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent form submission

            // Get form values
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

            // Get existing entries from localStorage or initialize as an empty array
            let entries = JSON.parse(localStorage.getItem('entries')) || [];

            // Add new entry to the array
            entries.push({
                name: name,
                email: email,
                password: password,
                dob: dob,
                termsAccepted: termsAccepted
            });

            // Save the updated entries back to localStorage
            localStorage.setItem('entries', JSON.stringify(entries));

            // Clear the form after submission
            document.getElementById('registrationForm').reset();

            // Re-render the table with the new data
            renderTable();
        });