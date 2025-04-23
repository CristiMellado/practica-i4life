const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const router = express.Router();

// Registro de usuario
router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = new User({ username, password });
    await user.save();
    res.status(201).json({ message: "Usuario creado" });
  } catch (error) {
    res.status(400).json({ error: "El usuario ya existe" });
  }
});

// Inicio de sesión
router.post('/login', async (req, res) => { 
  console.log('Datos recibidos:', req.body); 
    try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    console.log(user)

    if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: 'Credenciales incorrectas' });
    }

    //en la firma añado el role para saber que usuario es 
    const token = jwt.sign({ userId: user._id, role:user.role}, process.env.SECRET_KEY, { expiresIn: '1h' });
    res.json({ token, role: user.role, username: user.username});
    } catch (error) {
    res.status(500).json({ error: 'Error en el servidor' });
    }
    });

    module.exports = router;