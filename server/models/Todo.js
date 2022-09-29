const mongoose = require('mongoose');

const TodoSchema = mongoose.Schema({
    title : {
        type : String
    },
    completed : {
        type : Boolean
    },
})

module.exports = mongoose.model('Todos', TodoSchema)