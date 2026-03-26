document.addEventListener('DOMContentLoaded', () => {
    const addContactPage = document.getElementById('add-contact-page');
    const viewContactsPage = document.getElementById('view-contacts-page');

    if (addContactPage) {
        const dobInput = document.getElementById('dob');
        if (dobInput) {
            const today = new Date();
            const yearLimit = today.getFullYear() - 20;
            const maxDate = new Date(yearLimit, today.getMonth(), today.getDate())
                            .toISOString().split("T")[0];
            dobInput.setAttribute("max", maxDate);
        }

        const form = document.getElementById('contact-form');

        form.addEventListener('submit', (e) => {
            e.preventDefault(); 
            let posValue = document.getElementById('position').value;
            if (posValue === 'Other') {
                posValue = document.getElementById('other_position').value;
            }
            let deptValue = document.getElementById('department').value;
            if (deptValue === 'Others') {
                deptValue = document.getElementById('other_dept').value;
            }
            const birthDate = new Date(document.getElementById('dob').value);
            const today = new Date();
            let age = today.getFullYear() - birthDate.getFullYear();
            const m = today.getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }

            if (age < 20) {
                alert("Invalid Date: Employee must be at least 20 years old.");
                return;
            }
            const newEmployee = {
                id: document.getElementById('id_number').value,
                firstname: document.getElementById('firstname').value,
                lastname: document.getElementById('lastname').value,
                phone: document.getElementById('phone').value,
                email: document.getElementById('email').value,
                dob: document.getElementById('dob').value,
                position: posValue,
                department: deptValue
            };

            let employees = JSON.parse(localStorage.getItem('ems_employees')) || [];
            employees.push(newEmployee);
            localStorage.setItem('ems_employees', JSON.stringify(employees));

            alert('Employee Registered Successfully!');
            form.reset(); 
            window.location.href = "view-contacts.html"; 
        });
    }

    if (viewContactsPage) {
        const tableBody = document.getElementById('employee-data');
        const employees = JSON.parse(localStorage.getItem('ems_employees')) || [];

        tableBody.innerHTML = "";

        if (employees.length === 0) {
            tableBody.innerHTML = "<tr><td colspan='9' style='text-align:center;'>No employees registered yet.</td></tr>";
        } else {
            employees.forEach((emp, index) => {
                const row = `
                    <tr>
                        <td>${index + 1}</td>
                        <td>${emp.id}</td>
                        <td>${emp.firstname} ${emp.lastname}</td>
                        <td>${emp.phone}</td>
                        <td>${emp.email}</td>
                        <td>${emp.dob}</td>
                        <td>${emp.position}</td> <td>${emp.department}</td>
                        <td class="action-buttons">
                            <button class="btn-edit" onclick="alert('Edit logic for ${emp.firstname}')">📝</button>
                            <button class="btn-delete" onclick="deleteEmployee(${index})">🗑</button>
                        </td>
                    </tr>
                `;
                tableBody.innerHTML += row;
            });
        }
    }
});

function deleteEmployee(index) {
    if (confirm("Are you sure you want to remove this employee?")) {
        let employees = JSON.parse(localStorage.getItem('ems_employees'));
        employees.splice(index, 1); 
        localStorage.setItem('ems_employees', JSON.stringify(employees)); 
        location.reload(); 
    }
}

function checkDepartment(val) {
    const otherGroup = document.getElementById('other-dept-group');
    if (val === 'Others') {
        otherGroup.style.display = 'block';
    } else {
        otherGroup.style.display = 'none';
    }
}

function toggleOtherPosition(val) {
    const otherGroup = document.getElementById('other-pos-group');
    if (val === 'Other') {
        otherGroup.style.display = 'block';
    } else {
        otherGroup.style.display = 'none';
    }
}