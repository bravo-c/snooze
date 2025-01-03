const request = require('supertest');
const app = require('../app.js');

describe('Project API', () => {
  let createdProjectId;

  // Test for GET all projects
  it('should fetch all projects', async () => {
    const response = await request(app).get('/api/projects');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  // Test for GET a single project by ID
  it('should fetch a specific project by ID', async () => {
    const response = await request(app).get('/api/projects/1');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', 1);
    expect(response.body).toHaveProperty('name');
    expect(response.body).toHaveProperty('description');
  });

  // Test for GET a non-existing project
  it('should return 404 for a non-existent project', async () => {
    const response = await request(app).get('/api/projects/999');
    expect(response.status).toBe(404);
  });

  // Test for POST (Create a new project)
  it('should create a new project', async () => {
    const newProject = {
      name: 'New Project',
      description: 'Description for the new project',
    };

    const response = await request(app)
      .post('/api/projects')
      .send(newProject);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe(newProject.name);
    expect(response.body.description).toBe(newProject.description);

    createdProjectId = response.body.id; // Save the created project ID for later tests
  });

  // Test for PUT (Update a project)
  it('should update an existing project', async () => {
    const updatedProject = {
      name: 'Updated Project Name',
      description: 'Updated description for the project',
    };

    const response = await request(app)
      .put(`/api/projects/${createdProjectId}`)
      .send(updatedProject);

    expect(response.status).toBe(200);
    expect(response.body.name).toBe(updatedProject.name);
    expect(response.body.description).toBe(updatedProject.description);
  });

  // Test for DELETE (Delete a project)
  it('should delete a project', async () => {
    const response = await request(app).delete(`/api/projects/${createdProjectId}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', createdProjectId);
  });

  // Test for DELETE non-existing project
  it('should return 404 when trying to delete a non-existent project', async () => {
    const response = await request(app).delete('/api/projects/999');
    expect(response.status).toBe(404);
  });
});
