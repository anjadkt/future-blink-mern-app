import { Router } from "express";
import authRoutes from "./routes/auth.routes";
import aiRoutes from "./routes/ai.routes";
import { authenticate } from "./middleware/auth.middleware";

const router = Router();

router.use('/auth', authRoutes);
router.use('/ai', authenticate, aiRoutes);

export default router ;