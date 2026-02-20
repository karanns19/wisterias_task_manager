import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
  },
  description: {
    type: String,
    default: '',
  },
  completed: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
}, {
  toJSON: {
    transform: function (doc, ret) {
      ret.id = ret._id.toString();
      delete ret._id;
      delete ret.__v;
    }
  }
});

export default mongoose.models.Task || mongoose.model('Task', TaskSchema);
