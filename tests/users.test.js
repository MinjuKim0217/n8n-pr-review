const request = require('supertest');
const app = require('../src/app');

describe('Users API', () => {
    test('GET /api/users should return users list', async () => {
        const response = await request(app)
            .get('/api/users')
            .expect(200);
            
        expect(response.body.success).toBe(true);
        expect(Array.isArray(response.body.data)).toBe(true);
    });

    test('POST /api/users should create a new user', async () => {
        const newUser = {
            name: 'Test User',
            email: 'test@example.com',
            age: 25
        };

        const response = await request(app)
            .post('/api/users')
            .send(newUser)
            .expect(201);

        expect(response.body.success).toBe(true);
        expect(response.body.data.name).toBe(newUser.name);
        expect(response.body.data.email).toBe(newUser.email);
    });

    test('GET /api/users/:id should return specific user', async () => {
        const response = await request(app)
            .get('/api/users/1')
            .expect(200);

        expect(response.body.success).toBe(true);
        expect(response.body.data.id).toBe(1);
    });

    test('PUT /api/users/:id should update user', async () => {
        const updateData = {
            name: 'Updated User'
        };

        const response = await request(app)
            .put('/api/users/1')
            .send(updateData)
            .expect(200);

        expect(response.body.success).toBe(true);
        expect(response.body.data.name).toBe(updateData.name);
    });

    test('DELETE /api/users/:id should delete user', async () => {
        const response = await request(app)
            .delete('/api/users/3')
            .expect(200);

        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('User deleted successfully');
    });

    test('GET /api/users/:id should return 404 for non-existent user', async () => {
        const response = await request(app)
            .get('/api/users/999')
            .expect(404);

        expect(response.body.error).toBe('User not found');
    });
});
