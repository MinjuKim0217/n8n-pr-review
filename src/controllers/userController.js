// 임시 데이터베이스 (실제로는 데이터베이스 사용)
let users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', age: 30 },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', age: 25 },
    { id: 3, name: 'Bob Wilson', email: 'bob@example.com', age: 35 }
];

const getAllUsers = (req, res) => {
    try {
        // 페이지네이션 지원 추가
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        
        // 로깅 추가 for debugging
        console.log(`Fetching users - Page: ${page}, Limit: ${limit}`);
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        
        const paginatedUsers = users.slice(startIndex, endIndex);
        
        res.json({
            success: true,
            data: paginatedUsers,
            count: paginatedUsers.length,
            total: users.length,
            page: page,
            totalPages: Math.ceil(users.length / limit)
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
        
        // 이름 길이 검증 추가
        if (name.length < 2 || name.length > 50) {
            return res.status(400).json({ error: 'Name must be between 2 and 50 characters' });
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
        console.log(`New user created: ${newUser.name} (${newUser.email})`); // 생성 로그
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

        // 업데이트할 필드 검증
        const { name, email, age } = req.body;
        const updatedFields = {};
        
        if (name !== undefined) {
            if (name.length < 2 || name.length > 50) {
                return res.status(400).json({ error: 'Name must be between 2 and 50 characters' });
            }
            updatedFields.name = name;
        }
        
        if (email !== undefined) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                return res.status(400).json({ error: 'Invalid email format' });
            }
            // 다른 사용자가 같은 이메일을 사용하는지 확인
            const existingUser = users.find(u => u.email === email && u.id !== id);
            if (existingUser) {
                return res.status(409).json({ error: 'Email already exists' });
            }
            updatedFields.email = email;
        }
        
        if (age !== undefined) {
            if (age < 0 || age > 120) {
                return res.status(400).json({ error: 'Age must be between 0 and 120' });
            }
            updatedFields.age = age;
        }

        users[userIndex] = { ...users[userIndex], ...updatedFields };
        console.log(`User updated: ${users[userIndex].name} (ID: ${id})`); // 업데이트 로그
        
        res.json({
            success: true,
            data: users[userIndex],
            message: 'User updated successfully'
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

        const deletedUser = users[userIndex];
        users.splice(userIndex, 1);
        console.log(`User deleted: ${deletedUser.name} (ID: ${id})`); // 삭제 로그
        
        res.json({
            success: true,
            message: 'User deleted successfully',
            deletedUser: {
                id: deletedUser.id,
                name: deletedUser.name
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 새로운 함수: 사용자 검색
const searchUsers = (req, res) => {
    try {
        const { q } = req.query; // 검색어
        
        if (!q || q.trim().length === 0) {
            return res.status(400).json({ error: 'Search query is required' });
        }
        
        const searchTerm = q.toLowerCase();
        const filteredUsers = users.filter(user => 
            user.name.toLowerCase().includes(searchTerm) ||
            user.email.toLowerCase().includes(searchTerm)
        );
        
        console.log(`Search performed: "${q}" - ${filteredUsers.length} results`);
        
        res.json({
            success: true,
            data: filteredUsers,
            count: filteredUsers.length,
            searchTerm: q
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
    deleteUser,
    searchUsers
};
