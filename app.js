const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());  // For parsing application/json

// Simple route
app.get('/', (req, res) => {
    res.send('Welcome to My Portfolio API!');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

let projects = [
    { id: 1, name: 'Project One', description: 'A description of project one.' },
    { id: 2, name: 'Project Two', description: 'A description of project two.' },
];

// GET all projects
app.get('/api/projects', (req, res) => {
    res.json(projects);
});

// GET a specific project by ID
app.get('/api/projects/:id', (req, res) => {
    const project = projects.find(p => p.id === parseInt(req.params.id));
    if (!project) return res.status(404).send('Project not found');
    res.json(project);
});

// POST a new project
app.post('/api/projects', (req, res) => {
    const { name, description } = req.body;
    const newProject = { id: projects.length + 1, name, description };
    projects.push(newProject);
    res.status(201).json(newProject);
});

// PUT to update a project by ID
app.put('/api/projects/:id', (req, res) => {
    const project = projects.find(p => p.id === parseInt(req.params.id));
    if (!project) return res.status(404).send('Project not found');

    project.name = req.body.name;
    project.description = req.body.description;
    res.json(project);
});

// DELETE a project by ID
app.delete('/api/projects/:id', (req, res) => {
    const projectIndex = projects.findIndex(p => p.id === parseInt(req.params.id));
    if (projectIndex === -1) return res.status(404).send('Project not found');

    const deletedProject = projects.splice(projectIndex, 1);
    res.json(deletedProject);
});

// Export app for testing
module.exports = app;
