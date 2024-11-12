const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Get all users
app.get('/api/users', (req, res) => {
    const data = JSON.parse(fs.readFileSync('data.json', 'utf-8'));
    res.json(data);
});

// Add a new user
app.post('/api/users', (req, res) => {
    const { name, email, dateOfBirth } = req.body;
    const data = JSON.parse(fs.readFileSync('data.json', 'utf-8'));
    const newUser = { id: Date.now(), name, email, dateOfBirth };
    data.push(newUser);
    fs.writeFileSync('data.json', JSON.stringify(data, null, 2));
    res.json(newUser);
});

// Update a user
app.put('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const { name, email, dateOfBirth } = req.body;
    const data = JSON.parse(fs.readFileSync('data.json', 'utf-8'));
    const userIndex = data.findIndex((user) => user.id == id);
    if (userIndex !== -1) {
        data[userIndex] = { id: Number(id), name, email, dateOfBirth };
        fs.writeFileSync('data.json', JSON.stringify(data, null, 2));
        res.json(data[userIndex]);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

// Delete a user
app.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const data = JSON.parse(fs.readFileSync('data.json', 'utf-8'));
    const updatedData = data.filter((user) => user.id != id);
    fs.writeFileSync('data.json', JSON.stringify(updatedData, null, 2));
    res.json({ message: 'User deleted' });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
