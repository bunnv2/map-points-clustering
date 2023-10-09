
## Map points clustering

### Description
This is a simple API for clustering map points. It uses SuperCluster library for clustering.
The API is written in TypeScript and uses Express framework. It has 2 endpoints:
- `/locations/getPoints` - returns clustered points based on scale
- `/locations/addPoint` - adds new point to the list of points

It also has a simple UI for showing points on the map. The UI is written in handlebars and uses Leaflet library for showing points on the map.

### Setup
1. git clone https://github.com/bunnv2/map-points-clustering.git
2. cd map-points-clustering
3. npm install
4. npm run create-env
5. npm run dev (for development)
6. npm run build (for production)
7. npm run start (for production)

### Milestones
#### PHASE 1 - basic required features [API]
- [x] Create model for map points
- [x] Create types for map points and requests and responses
- [x] Mock data for map points
- [x] Create API for map points clustering with SuperCluster based on scale
#### PHASE 2 - optional features [UI and Validation]
- [x] Make tests for API
- [x] Validate input data and manage errors
- [x] Create UI for map points clustering, using Leaflet
- [x] Send points to UI and show them on map
- [x] Zoom in/out to see the difference

#### ADDITIONAL
- [x] Add more points
- [x] Refactor types
- [x] Add more tests
- [x] Add endpoint for adding new points

### Commands
- `npm run dev` - run development server
- `npm run build` - build production bundle
- `npm run start` - run production server
- `npm run test` - run tests
- `npm run create-env` - create .env file