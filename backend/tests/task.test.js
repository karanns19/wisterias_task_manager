const request = require('supertest');
const app = require('../src/app');

describe('Task API', () => {
  // Test 1: GET /tasks
  it('should GET all tasks', async () => {
    const res = await request(app).get('/tasks');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThanOrEqual(2);
  });

  // Test 2: POST /tasks
  it('should create a new task', async () => {
    const newTask = {
      title: 'Test Task',
      description: 'Test Description'
    };
    const res = await request(app)
      .post('/tasks')
      .send(newTask);
    
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.title).toBe(newTask.title);
    expect(res.body.completed).toBe(false);
  });

  // Test 3: GET /tasks/:id
  it('should fetch a specific task by ID', async () => {
    // We know ID 1 exists from initial data
    const res = await request(app).get('/tasks/1');
    expect(res.statusCode).toEqual(200);
    expect(res.body.id).toBe(1);
    expect(res.body).toHaveProperty('title');
  });

  // Test 4: DELETE /tasks/:id
  it('should delete a task', async () => {
    // First create a task to delete to ensure predictability
    const createRes = await request(app)
      .post('/tasks')
      .send({ title: 'Task to Delete', description: 'Will be removed' });
    
    const taskId = createRes.body.id;

    const deleteRes = await request(app).delete(`/tasks/${taskId}`);
    expect(deleteRes.statusCode).toEqual(200);
    expect(deleteRes.body.message).toBe('Task deleted successfully');

    // Verify it's gone
    const getRes = await request(app).get(`/tasks/${taskId}`);
    expect(getRes.statusCode).toEqual(404);
  });

  // Test 5 (Bonus): Handle non-existent task
  it('should return 404 for a task that does not exist', async () => {
    const res = await request(app).get('/tasks/999');
    expect(res.statusCode).toEqual(404);
    expect(res.body.message).toBe('Task not found');
  });
});
