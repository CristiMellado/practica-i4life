//Importa Mongoose - permite definir modelos y esquemas para mi BD
const mongoose = require('mongoose');

//Creo un esquema 
const taskSchema = new mongoose.Schema({
title: { type: String, required: true },
completed: { type: Boolean, default: false },
userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true } //probando esto para que funcione
// userId: {type: String, default: null}
/*con timestamps, agrga createAt y updateAt a cada documento útil 
para saber cuando se creó y cuando se modificó*/
}, { timestamps: true });  

/*Creo un modelo - Con ello puedo crear, leer, actualizar y eliminar tares en Mongo
como si fueran objetos normales en JS*/
const Task = mongoose.model('Task', taskSchema);

//Exporta el modelo para usar en otros archivos Node.js
module.exports = Task;