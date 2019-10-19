const express = require("express");
const server = express();

//query params = ?teste=1
//route paams = /users/1  req.
//request body = {"name": "Diogo"}

server.use(express.json());
server.listen(3000);

const projects = [];
var count = 0;

checkExitProject = (req, res, next) => {
  const { id } = req.params;
  const project = projects.find(p => p.id == id);
  if (!project) {
    return res
      .status(400)
      .json({ message: `o projeto não existe para o ID: ${id}` });
  } else {
    next();
  }
};

countReq = (req, res, next) => {
  count++;
  console.log(count);
  next();
};

server.use(countReq);

server.post("/projects", (req, res) => {
  const { id, title } = req.body;
  newProjetc = { id: id, title: title, tasks: [] };
  projects.push(newProjetc);
  return res.json(projects);
});

server.get("/projects", (req, res) => {
  return res.json({ projects });
});

server.put("/projects/:id", checkExitProject, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  let project = projects.find(p => p.id == id);

  console.log(project);
  project.title = title;
  return res.json({ project });
});

server.delete("/projects/:id", (req, res) => {
  const { id } = req.params;
  const projectIndex = projects.findIndex(p => p.id == id);
  projects.splice(projectIndex, 1);
  return res.send();
});

server.post("/projects/:id/tasks", (req, res) => {
  const { id } = req.params;
  const { task } = req.body;
  projects[id].tasks.push(task);

  return res.json({ projects });
});
