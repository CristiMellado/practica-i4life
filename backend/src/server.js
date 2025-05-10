require('dotenv').config(); //sirve para cargar variables de entorno
const express = require('express'); //framework para gestionar el servidor 
const cors = require('cors'); //permite que el fronted se comunique con el backend
const connectDB = require('./config/db');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
// Conectar a MongoDB a que pongo mis rutas 
connectDB();
const taskRoutes = require('./routes/tasks.routes');
app.use('/api', taskRoutes);

const authRoutes = require('./routes/auth.routes')
app.use('/api/auth', authRoutes)

app.get('/', (req, res) => {
res.send('¡Servidor funcionando!');
});
app.listen(PORT, () => {
console.log(`Servidor corriendo en http://localhost:${PORT}`);
});