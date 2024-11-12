const API_URL = 'http://localhost:5000/api/users';

const fetchUsers = async () => {
    const response = await fetch(API_URL);
    const users = await response.json();
    const userTableBody = document.getElementById('user-table-body');
    userTableBody.innerHTML = '';

    users.forEach((user) => {
        const row = document.createElement('tr');
        
        const nameCell = document.createElement('td');
        nameCell.textContent = user.name;
        row.appendChild(nameCell);

        
        const emailCell = document.createElement('td');
        emailCell.textContent = user.email;
        row.appendChild(emailCell);

        const dobCell = document.createElement('td');
        dobCell.textContent = user.dateOfBirth;
        row.appendChild(dobCell);

       
        const actionsCell = document.createElement('td');

        
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.classList.add('edit');
        editButton.onclick = () => editUser(user);
        actionsCell.appendChild(editButton);

     
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete');
        deleteButton.onclick = () => deleteUser(user.id);
        actionsCell.appendChild(deleteButton);

        row.appendChild(actionsCell);
        userTableBody.appendChild(row);
    });
};

const addUser = async () => {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const dateOfBirth = document.getElementById('dob').value;

    if (name && email && dateOfBirth) {
        await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, dateOfBirth }),
        });
        fetchUsers();
    } else {
        alert("Please fill in all fields.");
    }
};

const editUser = async (user) => {
    const newName = prompt('Enter new name:', user.name);
    const newEmail = prompt('Enter new email:', user.email);
    const newDob = prompt('Enter new date of birth:', user.dateOfBirth);

    if (newName && newEmail && newDob) {
        await fetch(`${API_URL}/${user.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: newName, email: newEmail, dateOfBirth: newDob }),
        });
        fetchUsers();
    }
};

const deleteUser = async (id) => {
    if (confirm("Are you sure you want to delete this user?")) {
        await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        fetchUsers();
    }
};


fetchUsers();
