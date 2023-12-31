import Supercluster from 'supercluster';
import { loadPoints } from './loadPoints';

export class Clustering {
    
    /**
     * Returns an array of clustered points based on the given zoom level and locations.
     * @param zoom - The zoom level to cluster the points.
     * @param locations - The array of locations to cluster.
     * @returns An array of clustered points.
     */
    static getPoints(zoom:number, locations = loadPoints()) {
        const cluster = new Supercluster({
            radius: 55,
            maxZoom: 19
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
