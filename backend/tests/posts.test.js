
const request = require('supertest');
const app = require('../../index');
const db = require('../config/db'); 

let userToken = '';
let adminToken = '';
let postId;

beforeAll(async () => {
  await db.execute('DELETE FROM posts');
  await db.execute('DELETE FROM users');

  await request(app)
    .post('/auth/register')
    .send({
      username: 'normaluser',
      email: 'user@example.com',
      password: 'user123',
      role: 'user'
    });

  const userLogin = await request(app)
    .post('/auth/login')
    .send({
      email: 'user@example.com',
      password: 'user123'
    });
  userToken = userLogin.body.accessToken;

  await request(app)
    .post('/auth/register')
    .send({
      username: 'adminuser',
      email: 'admin@example.com',
      password: 'admin123',
      role: 'admin'
    });

  const adminLogin = await request(app)
    .post('/auth/login')
    .send({
      email: 'admin@example.com',
      password: 'admin123'
    });
  adminToken = adminLogin.body.accessToken;
});

describe('Post API', () => {
  it('should allow user to create a post', async () => {
    const res = await request(app)
      .post('/posts')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        title: 'User Post',
        content: 'Content by user',
        isAdminOnly: false
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe('User Post');
    postId = res.body.id;
  });

  it('should allow getting all posts', async () => {
    const res = await request(app)
      .get('/posts')
      .set('Authorization', `Bearer ${userToken}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should allow user to update own post', async () => {
    const res = await request(app)
      .put(`/posts/${postId}`)
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        title: 'Updated Title',
        content: 'Updated content'
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe('Updated Title');
  });

  it('should forbid user from accessing admin-only posts', async () => {
    await request(app)
      .post('/posts')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        title: 'Secret Admin Post',
        content: 'Only admin can view',
        isAdminOnly: true
      });

    const res = await request(app)
      .get('/posts/admin-only')
      .set('Authorization', `Bearer ${userToken}`);

    expect(res.statusCode).toBe(403);
  });

  it('should allow admin to access admin-only posts', async () => {
    const res = await request(app)
      .get('/posts/admin-only')
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0].isAdminOnly).toBe(true);
  });

  it('should allow user to delete own post', async () => {
    const res = await request(app)
      .delete(`/posts/${postId}`)
      .set('Authorization', `Bearer ${userToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Post deleted');
  });

  it('should not allow user to delete another user\'s post', async () => {
    const post = await request(app)
      .post('/posts')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        title: 'Admin Post',
        content: 'Admin content',
        isAdminOnly: false
      });

    const res = await request(app)
      .delete(`/posts/${post.body.id}`)
      .set('Authorization', `Bearer ${userToken}`);

    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe('Not allowed to delete this post');
  });
});
