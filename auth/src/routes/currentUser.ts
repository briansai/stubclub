import express from 'express';
import { currentUser } from '@stubclub/common';

const router = express.Router();

router.get('/api/users/currentuser', currentUser, (req, res) => {
  res.send({ currentUser: req.currentUser || null, admin: req.admin });
});

export { router as currentUserRouter };
