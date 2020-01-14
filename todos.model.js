const mongoose = require('mongoose');


//Schema
const todosSchema = new mongoose.Schema({
    name: {
        type: String, required: true
    },
    description: {
        type: String,
        required: true
    },
    birth: {
        type: Date,
        required: true
    }
});


module.exports = mongoose.model('Todo', todosSchema);