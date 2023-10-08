// routes/locations.js
import express from 'express';
import { Clastering } from '../utilities/Clastering';
import fs from 'fs';
import path from 'path';
const router = express.Router();

import { Request, Response, NextFunction } from 'express';

function validateCoordinates(req: Request, res: Response, next: NextFunction) {
    const { latitude, longitude } = req.body;
    const parsedLat = parseFloat(latitude);
    const parsedLng = parseFloat(longitude);

    if (isNaN(parsedLat) || isNaN(parsedLng)) {
        return res.status(400).json({ error: 'Invalid coordinates. Please provide valid latitude and longitude.' });
    }

    next();
}

function validateZoom(req: Request, res: Response, next: NextFunction) {
    const { zoom } = req.body;
    const parsedZoom = parseInt(zoom);

    if (isNaN(parsedZoom) || parsedZoom < 0 || parsedZoom > 19) {
        return res.status(400).json({ error: 'Invalid zoom value. Zoom must be a number between 0 and 19.' });
    }

    next();
}

// Get all locations based on zoom
router.post('/getPoints/', validateZoom, (req, res) => {
    const { zoom } = req.body;
    const parsedZoom = parseInt(zoom);
    const points = Clastering.getPoints(parsedZoom);
    res.send(points);
});

// Add new point
router.post('/addPoint/', validateCoordinates, (req, res) => {
    const { latitude, longitude } = req.body;
    const parsedLat = parseFloat(latitude);
    const parsedLng = parseFloat(longitude);
    const point = {
        longitude: parsedLng,
        latitude: parsedLat
    }
    fs.readFile(path.resolve(__dirname, '../../data/points.json'), 'utf-8', (err, data) => {
        if (err) {
            console.log(err);
        } else {
            const points = JSON.parse(data);
            points.push(point);
            fs.writeFile(path.resolve(__dirname, '../../data/points.json'), JSON.stringify(points), (err) => {
                if (err) {
                    console.log(err);
                } else {
                    res.send(point);
                }
            });
        }
    } );
});

export default router;