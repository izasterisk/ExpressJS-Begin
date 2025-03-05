import { Router } from "express";
import usersRouter from 'file:///C:/Users/Admin/source/repos/ExpressJS-Begin/src/routes/users.mjs';
import productsRouter from 'file:///C:/Users/Admin/source/repos/ExpressJS-Begin/src/routes/products.mjs';

const router = Router();

router.use(usersRouter);
router.use(productsRouter);

export default router;