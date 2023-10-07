// routes/locations.js
import express from 'express';
import {Location} from '../models/Location';
import { Clastering } from '../utilities/Clastering';

const router = express.Router();


// Endpoint do pobierania punktów w zależności od skali mapy
router.get('/getPoints/:zoom', (req, res) => {
    const zoom = parseInt(req.params.zoom);
    const points = Clastering.getPoints(zoom);
    res.send(points);
});

export default router;