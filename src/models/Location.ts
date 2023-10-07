import { ILocation, Point } from "../types";

export class Location implements ILocation {
    latitude: number;
    longitude: number;

  constructor(point: Point) {
    this.latitude = point.latitude;
    this.longitude = point.longitude;
  }
}