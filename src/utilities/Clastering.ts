import { Location } from "../models/Location";
import { readFileSync } from "fs";
import { Point } from "../types";
import { Location as LocationModel } from "../models/Location";
import Supercluster from 'supercluster';

const path = require('path');
const locationData : Point[] = JSON.parse(readFileSync(path.resolve(__dirname, '../../data/points.json'), "utf-8"));
const locations = Array.from(locationData, (point) => new Location(point));


export class Clastering {
    static getPoints(zoom:number, bounds?: any) {
        const cluster = new Supercluster({
            radius: 50,
            maxZoom: 19
        });
        const { latitudes, longitudes } = bounds;
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
        let clusters 

        if (latitudes && longitudes) clusters = cluster.getClusters([latitudes[0], latitudes[1], longitudes[0], longitudes[1]], zoom);
        else clusters = cluster.getClusters([-180, -85, 180, 85], zoom);
        const clusteredPoints = clusters.map((cluster) => {
            if (cluster.properties.cluster) {
                return {
                    longitude: cluster.geometry.coordinates[0],
                    latitude: cluster.geometry.coordinates[1],
                    isCluster: true,
                    point_count: cluster.properties.point_count,
                }
             } else {
                return {
                    longitude: cluster.geometry.coordinates[0],
                    latitude: cluster.geometry.coordinates[1],
                    isCluster: false,
                };
            }
        });
        return clusteredPoints;
    }
}
