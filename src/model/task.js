import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let taskSchema = new Schema({
    title: { type: String, required: false },
    text: { type: Object, required: false },
    tags: { type: Array, required: true },
    dueDate: { type: String, required: false }
});

let taskModel = mongoose.model('Task', taskSchema);

export { taskSchema, taskModel };
