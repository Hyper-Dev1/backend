const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require('cors')

// app.use(cors())

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];
const requestLogger = (request, response, next) => {
  console.log("Method:", request.method);
  console.log("Path:  ", request.path);
  console.log("Body:  ", request.body);
  // console.log("---");
  next();
};
app.use(requestLogger);

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/info", (request, response) => {
  const reqs = persons.length;
  response.send(
    "<p> PhoneBook has info of " + reqs + "</br>" + new Date() + "</p>"
  );
});

app.post("/api/persons", (request, response) => {
  const note = request.body;
  console.log(note.name);
  for (let i = 0; i < persons.length; i++) {
    const ln = note.name.toLowerCase();
    const lns = persons[i].name.toLowerCase();
    if (ln.length !== 0) {
      if (ln === lns) {
        response.json({ error: "Name already exist" });
        break;
      } else {
        response.json(note);
      }
      break;
    } else {
      response.json({ error: "Enter Name/Number" });
    }
  }
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const note = persons.find((note) => note.id === id);
  if (note) {
    response.json(note);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  notes = persons.filter((note) => note.id !== id);
  response.status(204).end();
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
