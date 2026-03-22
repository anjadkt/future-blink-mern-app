import { User } from "../middleware/auth.middleware";

declare global {
    namespace Express {
        interface Request {
            user?: User;
        }
    }
}
export { };