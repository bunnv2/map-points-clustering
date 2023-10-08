import { readFileSync } from "fs";
import { Point } from "../types";
import { Location } from "../models/Location";

export function loadPoints() {
    const path = require('path');
    const locationData : Point[] = JSON.parse(readFileSync(path.resolve(__dirname, '../../data/points.json'), "utf-8"));
    return Array.from(locationData, (point) => new Location(point));

}