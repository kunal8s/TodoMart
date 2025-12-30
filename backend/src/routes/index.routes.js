import express from 'express';
import signuproutes from './signup.routes.js';
import homeroutes from './homepage.routes.js';
import signinroutes from './signin.routes.js';
import dashboardroutes from './dashboard.routes.js';
import todoroutes from './todo.routes.js';

const router = express.Router();

router.use('/signup', signuproutes);
router.use('/home', homeroutes);
router.use('/signin', signinroutes);
router.use('/dashboard', dashboardroutes);
router.use('/todos', todoroutes);

export default router;