//Importa Mongoose - permite definir modelos y esquemas para mi BD
const mongoose = require('mongoose');

//Creo un esquema 
const taskSchema = new mongoose.Schema({
title: { type: String, required: true },
//completed: { type: Boolean, default: false },
userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, //probando esto para que funcione
department: {
    type: String,
    enum: ['Datos & IOT', 'Desarrollo Fullstack', 'Marketing', 'Diseño Web'],
    required: false,
  },
  //añado el campo status para saber la tarea en que se encuentra
  status: {
    type: String,
    enum: ['Todo', 'Completed'],
    default: 'Todo'
  },
  // fecha de vencimiento
  dueDate: { 
    type: Date,
    required: false 
  },


/*con timestamps, agrga createAt y updateAt a cada documento útil 
para saber cuando se creó y cuando se modificó*/
}, { timestamps: true });  

/*Creo un modelo - Con ello puedo crear, leer, actualizar y eliminar tares en Mongo
como si fueran objetos normales en JS*/
const Task = mongoose.model('Task', taskSchema);

//Exporta el modelo para usar en otros archivos Node.js
module.exports = Task;