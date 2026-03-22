import { Router } from "express";
import { handleAskAI, handleSave } from "../controller/ai.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

router.post('/ask', authenticate , handleAskAI );
router.post('/save', authenticate , handleSave );

export default router;