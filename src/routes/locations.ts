// routes/locations.js
import express from 'express';
import { Clustering } from '../utilities/Clustering';
import fs from 'fs';
import path from 'path';
const router = express.Router();

import { Request, Response, NextFunction } from 'express';

/**
 * Validates the latitude and longitude coordinates in the request body.
 * @param req - The Express request object.
 * @param res - The Express response object.
 * @param next - The Express next function.
 * @returns Returns a 400 error response if the coordinates are invalid, otherwise calls the next middleware.
 */
function validateCoordinates(req: Request, res: Response, next: NextFunction) {
    const { latitude, longitude } = req.body;
    const parsedLat = parseFloat(latitude);
    const parsedLng = parseFloat(longitude);

    if (isNaN(parsedLat) || isNaN(parsedLng)) {
        return res.status(400).json({ error: 'Invalid coordinates. Please provide valid latitude and longitude.' });
    }

    next();
}

/**
 * Validates the zoom value in the request body.
 * @param req - The request object.
 * @param res - The response object.
 * @param next - The next middleware function.
 * @returns Returns a 400 error response with a message if the zoom value is invalid, otherwise calls the next middleware function.
 */
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
    try {
        const { zoom } = req.body;
        const parsedZoom = parseInt(zoom);
        const points = Clustering.getPoints(parsedZoom);
        res.send(points);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
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
            return res.status(500).json({ error: 'Internal server error' });
        }
        try {
            const points = JSON.parse(data);
            points.push(point);
            fs.writeFile(path.resolve(__dirname, '../../data/points.json'), JSON.stringify(points), (err) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({ error: 'Internal server error' });
                } else {
                    res.send(point);
                }
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    } );
});

export default router;