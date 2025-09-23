// 임시 데이터베이스 (실제로는 데이터베이스 사용)
let users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', age: 30 },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', age: 25 },
    { id: 3, name: 'Bob Wilson', email: 'bob@example.com', age: 35 }
];

const getAllUsers = (req, res) => {
    try {
        res.json({
            success: true,
            data: users,
            count: users.length
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createUser = (req, res) => {
    try {
        const { name, email, age } = req.body;
        
        if (!name || !email) {
            return res.status(400).json({ error: 'Name and email are required' });
        }

        const newUser = {
            id: users.length + 1,
            name,
            email,
            age: age || 0
        };

           // 이메일 형식 검증 추가
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: 'Invalid email format' });
        }
        
        // 중복 이메일 검사 추가
        const existingUser = users.find(u => u.email === email);
        if (existingUser) {
            return res.status(409).json({ error: 'Email already exists' });
        }

        users.push(newUser);
        res.status(201).json({
            success: true,
            data: newUser
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getUserById = (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const user = users.find(u => u.id === id);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({
            success: true,
            data: user
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateUser = (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const userIndex = users.findIndex(u => u.id === id);

        if (userIndex === -1) {
            return res.status(404).json({ error: 'User not found' });
        }

        users[userIndex] = { ...users[userIndex], ...req.body };
        res.json({
            success: true,
            data: users[userIndex]
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteUser = (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const userIndex = users.findIndex(u => u.id === id);

        if (userIndex === -1) {
            return res.status(404).json({ error: 'User not found' });
        }

        users.splice(userIndex, 1);
        res.json({
            success: true,
            message: 'User deleted successfully'
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllUsers,
    createUser,
    getUserById,
    updateUser,
    deleteUser
};
