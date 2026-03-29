document.addEventListener('DOMContentLoaded', () => {
    const addContactPage = document.getElementById('add-contact-page');
    const viewContactsPage = document.getElementById('view-contacts-page');
    const welcomeOverlay = document.getElementById('welcome-overlay');

    if (welcomeOverlay) {
        const greetingElement = document.getElementById('dynamic-greeting');
        const hour = new Date().getHours();
        if (hour < 12) {
            greetingElement.innerText = "Good morning,";
        } else if (hour < 17) {
            greetingElement.innerText = "Good afternoon,";
        } else {
            greetingElement.innerText = "Good evening,";
        }
        setTimeout(() => {
            dismissWelcome();
        }, 2000);
        function dismissWelcome() {
    const overlay = document.getElementById('welcome-overlay');
    const mainContent = document.querySelector('.reveal-content');
    if (overlay && !overlay.classList.contains('welcome-hidden')) {
        overlay.classList.add('welcome-hidden');
        if (mainContent) mainContent.classList.add('content-visible');
        setTimeout(() => {
            overlay.style.display = 'none';
        }, 800);
    }
}
    }

    if (addContactPage) {
        const dobInput = document.getElementById('dob');
        if (dobInput) {
            const today = new Date();
            const yearLimit = today.getFullYear() - 20;
            const maxDate = new Date(yearLimit, today.getMonth(), today.getDate())
                            .toISOString().split("T")[0];
            dobInput.setAttribute("max", maxDate);
        }

const idInput = document.getElementById('id_number');
if (idInput) {
    idInput.addEventListener('input', function() {
        this.value = this.value.replace(/\D/g, '');
    });
}
const phoneInput = document.getElementById('phone');
if (phoneInput) {
    phoneInput.addEventListener('input', function() {
        let val = this.value;
        if (val.startsWith('+')) {
            this.value = '+' + val.substring(1).replace(/\D/g, '');
        } else {
            this.value = val.replace(/\D/g, '');
        }
        const length = this.value.length;
        if (this.value.startsWith('+')) {
            this.style.borderColor = (length === 13) ? "#00a65a" : "#dd4b39";
        } else if (this.value.startsWith('254')) {
            this.style.borderColor = (length === 12) ? "#00a65a" : "#dd4b39";
        } else {
            this.style.borderColor = (length === 10) ? "#00a65a" : "#dd4b39";
        }
    });
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
            tableBody.innerHTML = "<tr><td colspan='7' style='text-align:center;'>No employees registered yet.</td></tr>";
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
                        <td class="action-buttons">
                            <button class="btn-details" onclick="viewDetails(${index})">👁 Details</button>
                            <button class="btn-edit" onclick="editEmployee()">📝 Edit</button>
                            <button class="btn-delete" onclick="deleteEmployee(${index})">🗑 Delete</button>
                        </td>
                    </tr>
                `;
                tableBody.innerHTML += row;
            });
        }
    }
}); 
function viewDetails(index) {
    const employees = JSON.parse(localStorage.getItem('ems_employees')) || [];
    const emp = employees[index];
    alert(`FULL EMPLOYEE DETAILS:\n\nName: ${emp.firstname} ${emp.lastname}\nID Number: ${emp.id}\nPhone: ${emp.phone}\nEmail: ${emp.email}\nDOB: ${emp.dob}\nPosition: ${emp.position}\nDepartment: ${emp.department}`);
}

function editEmployee() {
    alert("Edit Alert: You are about to edit this employee's details.");
}

function deleteEmployee(index) {
    if (confirm("Are you sure you want to delete?")) {
        let employees = JSON.parse(localStorage.getItem('ems_employees'));
        employees.splice(index, 1); 
        localStorage.setItem('ems_employees', JSON.stringify(employees)); 
        location.reload(); 
    }
}

function checkDepartment(val) {
    const otherGroup = document.getElementById('other-dept-group');
    if (otherGroup) {
        otherGroup.style.display = (val === 'Others') ? 'block' : 'none';
    }
}
function toggleOtherPosition(val) {
    const otherGroup = document.getElementById('other-pos-group');
    const positionInput = document.getElementById('other_position');
    
    if (otherGroup) {
        if (val === 'Other') {
            otherGroup.style.display = 'block';
            if (positionInput) {
                positionInput.placeholder = "Please specify your position";
            }
        } else {
            otherGroup.style.display = 'none';
        }
    }
}
function filterTable() {
    const input = document.getElementById("searchInput");
    const filter = input.value.toUpperCase();
    const table = document.querySelector(".employee-table");
    const tr = table.getElementsByTagName("tr");

    for (let i = 1; i < tr.length; i++) {
        const idCol = tr[i].getElementsByTagName("td")[1]; 
        const nameCol = tr[i].getElementsByTagName("td")[2]; 
        
        if (idCol || nameCol) {
            const idText = idCol.textContent || idCol.innerText;
            const nameText = nameCol.textContent || nameCol.innerText;
            if (idText.toUpperCase().indexOf(filter) > -1 || nameText.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}