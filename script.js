
        function renderTable() {
            const tableBody = document.querySelector('#usersTable tbody');
            tableBody.innerHTML = ''; 


            const storedEntries = JSON.parse(localStorage.getItem('entries')) || [];

 
            storedEntries.forEach(entry => {
                const newRow = document.createElement('tr');
                newRow.innerHTML = `
                    <td>${entry.name}</td>
                    <td>${entry.email}</td>
                    <td>${entry.password}</td>
                    <td>${entry.dob}</td>
                    <td>${entry.termsAccepted}</td>
                `;
                tableBody.appendChild(newRow);
            });
        }


        document.addEventListener('DOMContentLoaded', renderTable);

  
        document.getElementById('registrationForm').addEventListener('submit', function(event) {
            event.preventDefault(); 


            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const dob = document.getElementById('dob').value;
            const termsAccepted = document.getElementById('terms').checked ? 'Yes' : 'No';


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