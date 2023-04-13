import mongoose from 'mongoose';

const todoSchema = mongoose.Schema({
  title: {
    type: String,
    require: true
  },
  level: {
    type: String,
    require: true
  },
  status: {
    type: String,
    default: "Pending"
  },
  category: {
    type: String,
    default: "On Hold"
  },
  date: {
    type: Date,
    default: Date.now(),
  }
});

export default mongoose.model('Todo', todoSchema);