import { Location } from "../models/Location";
import { readFileSync } from "fs";
import { Point } from "../types";
import { Location as LocationModel } from "../models/Location";
import Supercluster from 'supercluster';

const path = require('path');
const locationData : Point[] = JSON.parse(readFileSync(path.resolve(__dirname, '../../data/points.json'), "utf-8"));
const locations = Array.from(locationData, (point) => new Location(point));


// static class
export class Clastering {
    static getPoints(zoom:number) {
        const cluster = new Supercluster({
            radius: 40,
            maxZoom: 16
        });

        const points: GeoJSON.Feature<GeoJSON.Point, { id: number }>[]
            = locations.map((location, id) => {
                return {
                    type: "Feature",
                    properties: { id },
                    geometry: {
                        type: "Point",
                        coordinates: [location.longitude, location.latitude],
                    },
                };
            });

        cluster.load(points);

        const clusters = cluster.getClusters([-180, -85, 180, 85], zoom);

        return clusters;
    }
}
