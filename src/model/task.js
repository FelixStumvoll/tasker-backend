import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let taskSchema = new Schema({
    route: { type: String, required: true },
    title: { type: String, required: false },
    text: { type: String, required: false },
    tags: { type: Array, required: true }
});

let taskModel = mongoose.model('Task', taskSchema);

export { taskSchema, taskModel };
