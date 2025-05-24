
const request = require('supertest');
const app = require('../index');
const db = require('../config/db');

let accessToken = '';

beforeAll(async () => {
  await db.execute('DELETE FROM users');
});

describe('Auth API', () => {
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({
        username: 'testuser',
        email: 'test@example.com',
        password: 'test123',
        role: 'user'
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body.message).toBe('User registered');
  });

  it('should login and return accessToken', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({
        email: 'test@example.com',
        password: 'test123'
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('accessToken');
    accessToken = res.body.accessToken;
  });

  it('should get accessToken from refreshToken', async () => {
    const agent = request.agent(app);
    await agent
      .post('/auth/login')
      .send({
        email: 'test@example.com',
        password: 'test123'
      });

    const res = await agent.post('/auth/refresh');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('accessToken');
  });

  it('should delete user', async () => {
    const res = await request(app)
      .delete('/auth/delete')
      .set('Authorization', `Bearer ${accessToken}`);

    expect(res.statusCode).toBe(200);
  });
});
