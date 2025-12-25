import { Router } from 'express';
import { loginPlayer, loginHost } from '#api/controller/authController'; 

const router = Router();

router.post('/login/player', loginPlayer);
router.post('/login/host', loginHost);
export default router;