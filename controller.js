//inicializaciones
const express = require('express');
const cors = require("cors");
const {
    readTask,
    createTask,
    updateTask,
    deleteTask
} = require('./service');
const {
    readGuest,
    createGuest,
    updateGuest,
    deleteGuest
} = require('./service2');
const app = express();

//middleware
app.use(express.json()); // ← necesario para leer JSON
app.use(cors());

//endpoints para task
app.get("/api/taskRead", readTask);
app.post("/api/taskCreate", createTask);
app.put("/api/taskUpdate", updateTask);
app.delete("/api/taskDelete", deleteTask);

//endpoints para Guest 
app.get("/api/guest", readGuest);
app.post("/api/guest", createGuest);
app.put("/api/guest", updateGuest);
app.delete("/api/guest", deleteGuest);



//ejecucion de programa
app.listen(3000, () => console.log("server running"));




