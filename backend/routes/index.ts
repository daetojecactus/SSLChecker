import express from 'express';
import SSLInfoRoutes from './SSLInfoRoutes';

const router = express.Router();

router.use('/ssl-info', SSLInfoRoutes);


export default router;
