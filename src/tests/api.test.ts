import request from 'supertest';
import app from '../index';
import { readFileSync, writeFileSync } from "fs";
import path from 'path';

describe('POST /locations/getPoints', () => {
  it('should return 200 OK', async () => {
    const response = await request(app)
      .post('/locations/getPoints/')
      .send({ zoom: 19 });
    expect(response.status).toBe(200);
  });

  it('should return 400 Bad Request if zoom is missing', async () => {
    const response = await request(app)
      .post('/locations/getPoints/')
      .send({});
    expect(response.status).toBe(400);
  });

  it('should return 400 Bad Request if zoom is not a number', async () => {
    const response = await request(app)
      .post('/locations/getPoints/')
      .send({ zoom: 'abc' });
    expect(response.status).toBe(400);
  });

  it('should return 400 Bad Request if zoom is less than 0', async () => {
    const response = await request(app)
      .post('/locations/getPoints/')
      .send({ zoom: -1 });
    expect(response.status).toBe(400);
  });
});

describe('POST /locations/addPoint', () => {
  it('should return 200 OK', async () => {
    const response = await request(app).post('/locations/addPoint')
      .send({ latitude: 10, longitude: 10 });
    
    const points = JSON.parse(readFileSync(path.resolve(__dirname, '../../data/points.json'), "utf-8"));
    expect(points[points.length - 1]).toHaveProperty('latitude', 10);
    expect(points[points.length - 1]).toHaveProperty('longitude', 10);
    points.pop();
    writeFileSync(path.resolve(__dirname, '../../data/points.json'), JSON.stringify(points));

    expect(response.status).toBe(200);
  });

  it('should return 400 Bad Request if request body is missing', async () => {
    const response = await request(app).post('/locations/addPoint')
      .send({});

    expect(response.status).toBe(400);
  });

  it('should return 400 Bad Request if wrong values type', async () => {
    const response = await request(app).post('/locations/addPoint')
      .send({longitude: 'abc', latitude: 'abc'});

    expect(response.status).toBe(400);
  });
});