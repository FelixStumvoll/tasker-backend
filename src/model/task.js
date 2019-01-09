import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

let taskSchema = new Schema({
    title: { type: String, required: false },
    text: { type: Object, required: false },
    tags: { type: Array, required: false },
    dueDate: { type: String, required: false },
    userId: { type: ObjectId, required: true }
});

let taskModel = mongoose.model('Task', taskSchema);

export { taskSchema, taskModel };
