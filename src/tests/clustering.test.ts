import { Clustering } from '../utilities/Clustering';
import { Location } from '../models/Location';
import { Point } from '../types';

describe('Clustering', () => {
    describe('getPoints', () => {
        it('returns clustered points for a given zoom level', () => {
            const zoom = 1;

            const locations = [
                new Location({latitude: 10, longitude: 20} as Point),
                new Location({latitude: 11, longitude: 21 } as Point)
            ];

            const clusteredPoints = Clustering.getPoints(zoom, locations);

            expect(clusteredPoints.length).toBe(1);
            expect(clusteredPoints[0]).toHaveProperty('point_count',2);
        });
    });
});
