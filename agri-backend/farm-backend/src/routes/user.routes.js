import express from 'express';
import { getAllUsers, 
    getUserById, 
    createUser, 
    updateUser, 
    deleteUser ,
    toggleUserActive,
 } from '../controllers/user.controller.js';

const router = express.Router();

router.get('/', getAllUsers ) ;       // GET /users
router.get('/:id', getUserById);    // GET /users/:id
router.post('/', createUser);      // POST /users
router.put('/:id', updateUser)   // PUT /users
router.delete('/:id', deleteUser); // DELETE /users/:id
router.put("/:id/toggle-active", toggleUserActive); // LOCK user:/id
export default router;
