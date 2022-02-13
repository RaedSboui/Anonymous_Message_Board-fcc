const mongoose = require('mongoose');
const { Schema } = mongoose;

const ReplySchema = new Schema({
    text: { type: String },
    delete_password: { type: String },
    created_on: { type: Date },
    reported: { type: Boolean, default: false }
})
const Reply = mongoose.model('Reply', ReplySchema)


const ThreadSchema = new Schema({
    text: { type: String },
    delete_password: { type: String },
    //board: { type: String },
    created_on: { type: Date },
    bumped_on: { type: Date },
    reported: { type: Boolean, default: false },
    replies: { type: [ReplySchema], default: [] }
})
const Thread = mongoose.model('Thread', ThreadSchema)


exports.Thread = Thread
exports.Reply = Reply

