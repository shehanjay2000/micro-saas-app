import { Schema, model } from 'mongoose';

const todoSchema = new Schema({
  text: { type: String, required: true },
  completed: { type: Boolean, default: false }
});

export default model('Todo', todoSchema);
