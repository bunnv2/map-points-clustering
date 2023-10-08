// routes/locations.js
import express from 'express';
import {Location} from '../models/Location';
import { Clastering } from '../utilities/Clastering';

const router = express.Router();


// Get all locations based on zoom and bounds
router.post('/getPoints/', (req, res) => {
    const { zoom, bounds } = req.body;
    const parsedZoom = parseInt(zoom);
    const points = Clastering.getPoints(parsedZoom, [bounds.latitudes, bounds.longitudes]);
    res.send(points);
});

export default router;