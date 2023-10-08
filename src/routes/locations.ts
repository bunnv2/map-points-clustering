// routes/locations.js
import express from 'express';
import {Location} from '../models/Location';
import { Clastering } from '../utilities/Clastering';

const router = express.Router();


// Get all locations based on zoom
router.post('/getPoints/', (req, res) => {
    const { zoom } = req.body;
    const parsedZoom = parseInt(zoom);
    const points = Clastering.getPoints(parsedZoom);
    res.send(points);
});

export default router;