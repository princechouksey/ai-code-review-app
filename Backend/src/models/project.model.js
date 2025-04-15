const mongoose = require('mongoose');
const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Project name is required'],
    },
    code:{
        type: String,
        default: '',
    },
    reviews:{
        type: String,
        default: '',
    },
},{
    timestamps: true,
})
const projectModel = mongoose.model('Project', projectSchema)
module.exports = projectModel