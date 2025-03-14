import express from 'express';
import {
  CreateEvent,
  GetAllEvents,
  GetSingleEvent,
  UpdateEvent,
  DeleteEvent,
  joinEvent,
  SearchEvent
} from '../controllers/eventController.js'; 
import  protectRoute  from '../middleware/authMiddleware.js'; 

const router = express.Router();

router.post('/events', protectRoute, CreateEvent); 
router.get('/events', GetAllEvents); 
router.get('/events/search', SearchEvent); 
router.get('/events/:id', GetSingleEvent);
router.put('/events/:id', protectRoute, UpdateEvent); 
router.delete('/events/:id', protectRoute, DeleteEvent); 
router.post('/events/:id/join', protectRoute, joinEvent);

export default router;
