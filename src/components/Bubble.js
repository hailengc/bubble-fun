import Paper, { Path, Point } from "paper";

export default class Bubble extends Path {
  constructor(position, radius, options) {
    let initPoints = Bubble.getPoints(position, radius);
    super({
      segments: initPoints,
      strokeColor: "black",
      closed: true,
      ...options
    });
    this.smooth();
  }

  static getPoints(position, radius) {
    return [
      new Point(position.x - radius, position.y),
      new Point(position.x, position.y + radius),
      new Point(position.x + radius, position.y),
      new Point(position.x, position.y - radius)
    ];
  }
  /**
   * do animate stuff
   */
  animate() {}
}
