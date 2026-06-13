import express from 'express';
import Project from '../models/Project.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (project) {
      res.json(project);
    } else {
      res.status(404).json({ message: 'Project not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', protect, async (req, res) => {
  try {
    const { title, description, techStack, image, githubLink, liveLink, isFeatured } = req.body;

    const project = await Project.create({
      title,
      description,
      techStack,
      image,
      githubLink,
      liveLink,
      isFeatured,
    });

    res.status(201).json(project);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put('/:id', protect, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (project) {
      project.title = req.body.title || project.title;
      project.description = req.body.description || project.description;
      project.techStack = req.body.techStack || project.techStack;
      project.image = req.body.image || project.image;
      project.githubLink = req.body.githubLink || project.githubLink;
      project.liveLink = req.body.liveLink || project.liveLink;
      project.isFeatured = req.body.isFeatured !== undefined ? req.body.isFeatured : project.isFeatured;

      const updatedProject = await project.save();
      res.json(updatedProject);
    } else {
      res.status(404).json({ message: 'Project not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/:id', protect, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (project) {
      await project.deleteOne();
      res.json({ message: 'Project removed' });
    } else {
      res.status(404).json({ message: 'Project not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
