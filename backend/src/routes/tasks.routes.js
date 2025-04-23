const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const authMiddleware = require("../middleware/auth.middleware");
//añadir aqui el user 
const User = require("../models/user.model"); //aqui me daba el falló por no poner bien el nombre muy importante


//Obtener todos los usuarios (solo el _id y username)
router.get('/users', async (req, res) => {
  try {
    const users = await User.find({}, '_id username'); // seleccionamos solo lo necesario
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
}); 

// Obtener todas las tareas
router.get("/tasks", async (req, res) => {
  try {
    //const tasks = await Task.find();
    const tasks = await Task.find().populate('userId', 'username'); //me muestra el username
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener tareas" });
  }
});

//Obtener authMiddleware
router.get('/', authMiddleware,async (req, res) => { 
  console.log(req.userId)
    const tasks = await Task.find({ userId: req.userId });
    res.json(tasks);
});


// Refactorización  de mi post cuando recibe el departamento
router.post('/', authMiddleware, async (req, res) => {
  try {
    //agregamos ahora el userId 
    const { title, department,status, dueDate, userId, description } = req.body; // Recibimos el título y el departamento desde el cuerpo de la solicitud
    
    if (!title) {
      return res.status(400).json({ error: "El título es obligatorio" });
    }
    // Validamos que el departamento esté en el enum de valores permitidos
    const validDepartments = ['Datos & IOT', 'Desarrollo Fullstack', 'Marketing', 'Diseño Web'];
    if (department && !validDepartments.includes(department)) {
      return res.status(400).json({ error: "Departamento inválido" });
    }

    //validamos que la fecha que se proporciona es válida
    if (dueDate && isNaN(new Date(dueDate).getTime())) {
      return res.status(400).json({ error: "Fecha de vencimiento inválida" });
    }

    // Si no viene userId, usamos el del auth (por defecto)
    const assignedUserId = userId || req.userId; 

    // Verificamos que el userId exista en la base de datos
    const userExists = await User.findById(assignedUserId);
    if (!userExists) {
      return res.status(404).json({ error: "El usuario asignado no existe" });
    }



    // Creamos la nueva tarea con los datos recibidos
    const task = new Task({
      title,
      completed: false, 
      //userId: req.userId, //objeto Id para usar el username
      userId: assignedUserId,
      department, // Incluimos el departamento si fue enviado
      status: status || 'Todo',
      dueDate: dueDate || null, //añadimos la fecha
      description,
      
    });
    
    // Guardamos la tarea en la base de datos
    await task.save();
    
    // Respondemos con la tarea creada
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: "Error al crear la tarea" });
  }
});


// Marcar una tarea como completada
router.put("/tasks/:id/status", async (req, res) => {
  
    const taskId = req.params.id;
    const newStatus = req.body.status;
  
    // Aquí deberías buscar la tarea y actualizarla
    // por ejemplo usando Mongoose:
    Task.findByIdAndUpdate(taskId, { status: newStatus }, { new: true })
      .then(updatedTask => res.json(updatedTask))
      .catch(err => res.status(500).json({ error: err }));
  
});


// Eliminar una tarea
router.delete("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Task.findByIdAndDelete(id);
    res.json({ message: "Tarea eliminada" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar la tarea" });
  }
});
module.exports = router;



