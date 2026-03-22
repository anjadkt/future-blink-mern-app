import { Router } from "express";
import validate from "../middleware/validate.middleware";
import registerSchema from "../validations/register.validation";
import loginSchema from "../validations/login.validation";
import { handleLogin, handleRegister , handleRefresh , handleLogout , handleAuth } from "../controller/auth.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

router.post('/register', validate(registerSchema) , handleRegister );
router.post('/login', validate(loginSchema) , handleLogin );
router.get('/refresh', handleRefresh );
router.get('/logout', authenticate , handleLogout );
router.get('/me', authenticate , handleAuth)

export default router ;