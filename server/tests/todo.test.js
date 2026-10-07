const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/app');

describe('TODO API Specification Contract', () => {
  
  // 1. POST /api/todos
  describe('POST /api/todos - Create TODO', () => {
    it('Given valid payload with title and description, Then it creates and returns a 201 response with default done=false', async () => {
      const payload = {
        title: 'Complete Take Home Assessment',
        description: 'Implement full-stack app according to spec',
      };

      const res = await request(app)
        .post('/api/todos')
        .send(payload)
        .expect(201);

      expect(res.body).toHaveProperty('_id');
      expect(res.body.title).toBe(payload.title);
      expect(res.body.description).toBe(payload.description);
      expect(res.body.done).toBe(false);
      expect(res.body).toHaveProperty('createdAt');
      expect(res.body).toHaveProperty('updatedAt');
    });

    it('Given a payload without a title, Then it returns 400 Bad Request with a descriptive error', async () => {
      const res = await request(app)
        .post('/api/todos')
        .send({ description: 'Missing title' })
        .expect(400);

      expect(res.body).toHaveProperty('error');
    });

    it('Given an empty string title, Then it returns 400 Bad Request', async () => {
      const res = await request(app)
        .post('/api/todos')
        .send({ title: '   ' })
        .expect(400);

      expect(res.body).toHaveProperty('error');
    });
  });

  // 2. GET /api/todos
  describe('GET /api/todos - Retrieve all TODOs', () => {
    it('Given multiple existing todos, Then it returns 200 OK with all items sorted newest first', async () => {
      await request(app).post('/api/todos').send({ title: 'Task 1' });
      await request(app).post('/api/todos').send({ title: 'Task 2' });

      const res = await request(app)
        .get('/api/todos')
        .expect(200);

      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBe(2);
      expect(res.body[0].title).toBe('Task 2'); // Sorted by createdAt descending
    });
  });

  // 3. PUT /api/todos/:id
  describe('PUT /api/todos/:id - Update TODO', () => {
    it('Given an existing todo, When updating title and description, Then it returns 200 OK with updated attributes', async () => {
      const created = await request(app)
        .post('/api/todos')
        .send({ title: 'Original Title', description: 'Original Description' });

      const res = await request(app)
        .put(`/api/todos/${created.body._id}`)
        .send({ title: 'Updated Title', description: 'Updated Description' })
        .expect(200);

      expect(res.body.title).toBe('Updated Title');
      expect(res.body.description).toBe('Updated Description');
    });

    it('Given a non-existent ID, Then it returns 404 Not Found', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      await request(app)
        .put(`/api/todos/${fakeId}`)
        .send({ title: 'Should fail' })
        .expect(404);
    });
  });

  // 4. PATCH /api/todos/:id/done
  describe('PATCH /api/todos/:id/done - Toggle Done Status', () => {
    it('Given a pending todo (done=false), When patched, Then done toggles to true', async () => {
      const created = await request(app)
        .post('/api/todos')
        .send({ title: 'Pending Task' });

      expect(created.body.done).toBe(false);

      const toggled = await request(app)
        .patch(`/api/todos/${created.body._id}/done`)
        .expect(200);

      expect(toggled.body.done).toBe(true);
    });

    it('Given an already completed todo (done=true), When patched, Then done toggles to false', async () => {
      const created = await request(app)
        .post('/api/todos')
        .send({ title: 'Toggle Back Task' });

      await request(app).patch(`/api/todos/${created.body._id}/done`);

      const toggledBack = await request(app)
        .patch(`/api/todos/${created.body._id}/done`)
        .expect(200);

      expect(toggledBack.body.done).toBe(false);
    });

    it('Given a non-existent ID, Then it returns 404 Not Found', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      await request(app)
        .patch(`/api/todos/${fakeId}/done`)
        .expect(404);
    });
  });

  // 5. DELETE /api/todos/:id
  describe('DELETE /api/todos/:id - Delete TODO', () => {
    it('Given an existing todo, When deleted, Then it returns 200 and is no longer present in GET /api/todos', async () => {
      const created = await request(app)
        .post('/api/todos')
        .send({ title: 'To be deleted' });

      await request(app)
        .delete(`/api/todos/${created.body._id}`)
        .expect(200);

      const listRes = await request(app).get('/api/todos').expect(200);
      expect(listRes.body.find((t) => t._id === created.body._id)).toBeUndefined();
    });

    it('Given a non-existent ID, Then it returns 404 Not Found', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      await request(app)
        .delete(`/api/todos/${fakeId}`)
        .expect(404);
    });
  });
});