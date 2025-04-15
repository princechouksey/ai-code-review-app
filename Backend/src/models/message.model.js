const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    project:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true,
    },
    text:{
        type: String,
        required: [true, 'Message text is required'],
    }


},{
    timestamps: true,
})