import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a project title'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Please add a project description'],
    },
    techStack: {
      type: [String],
      required: [true, 'Please add technologies used'],
    },
    image: {
      type: String,
      required: [true, 'Please add a project image'],
    },
    githubLink: {
      type: String,
      required: [true, 'Please add a GitHub link'],
    },
    liveLink: {
      type: String,
      required: [true, 'Please add a live demo link'],
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model('Project', projectSchema);

export default Project;
