import { readFileSync } from "fs";
import { Point } from "../types";
import { Location } from "../models/Location";

/**
 * Loads the points data from a JSON file and returns an array of Location objects.
 * @returns An array of Location objects.
 */
export function loadPoints() {
    const path = require('path');
    const locationData : Point[] = JSON.parse(readFileSync(path.resolve(__dirname, '../../data/points.json'), "utf-8"));
    return Array.from(locationData, (point) => new Location(point));
}