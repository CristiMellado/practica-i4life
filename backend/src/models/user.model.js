const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
username: { type: String, required: true, unique: true },
password: { type: String, required: true }, 

//añadir el rol
role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user'
}
});
// Hashear la contraseña antes de guardar
UserSchema.pre('save', async function (next) {
if (!this.isModified('password')) return next();
this.password = await bcrypt.hash(this.password, 10);
next();
});

// Método para comparar contraseñas
UserSchema.methods.comparePassword = function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
  };

  

module.exports = mongoose.model('User', UserSchema);