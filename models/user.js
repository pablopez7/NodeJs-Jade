'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const emailMatch = [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Coloca un email válido']
const passwordValidation = {
	validator: function(p){
		return this.conf_password == p
	},
	message: 'Las contraseñas no son iguales'
}

const UserSchema = Schema({
	name: String,
	lastName: String,
	username: {type: String, required: true, maxlength: [50, 'El username es muy largo']},
	age: {type: Number, min: [2, 'La edad no puede ser menor a 2 digitos' ], max: [4, 'La edad no puede ser mayor a 4 digitos']},
	email: {type: String, required: 'El campo es obligatorio', match: emailMatch},
	password: {type: String, minlength: [5, 'El password es muy corto'], validate: passwordValidation},
	date: Date
})

//Campo virtual
UserSchema.virtual('conf_password').get(function() {
	return this.c_p
}).set(function(password){
	this.c_p = password
})

module.exports = mongoose.model('User', UserSchema)