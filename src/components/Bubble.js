import { Path, Color } from "paper";

const Circle = Path.Circle;
class Bubble extends Circle {
  constructor(position, radius) {
    super(position, radius);

    this.applyMatrix = false;
    this.data = {
      scaleDirection: {
        x: 1,
        y: -1
      },
      scaleDelta: {
        x: 0.001,
        y: 0.002
      },
      scaleRange: {
        x: 0.3,
        y: 0.3
      }
    };

    this.fillColor = {
      gradient: {
        stops: [
          [new Color(1, 1, 1, 0), 0.8],
          [new Color(1.0, 1.0, 1.0, 1.0), 1]
        ],
        radial: true
      },
      origin: this.bounds.center,
      destination: this.bounds.rightCenter
    };
  }
  getNextXScaling = () => {
    let prevXScaling = this.scaling.x;

    let { scaleDirection, scaleRange, scaleDelta } = this.data;

    if (
      prevXScaling >= 1.0 + scaleRange.x ||
      prevXScaling < 1.0 - scaleRange.x
    ) {
      scaleDirection.x *= -1;
    }
    return prevXScaling + scaleDirection.x * scaleDelta.x * 1;
  };

  getNextYScaling = () => {
    let prevYScaling = this.scaling.y;
    let { scaleDirection, scaleRange, scaleDelta } = this.data;

    if (
      prevYScaling >= 1.0 + scaleRange.y ||
      prevYScaling < 1.0 - scaleRange.y
    ) {
      scaleDirection.y *= -1;
    }
    return prevYScaling + scaleDirection.y * scaleDelta.y * 1;
  };

  setNextScaling = () => {
    this.scaling = { x: this.getNextXScaling(), y: this.getNextYScaling() };
  };

  setNextRotate = () => {
    this.rotate(3 * Math.random());
  };

  animate = () => {
    this.setNextScaling();
    this.setNextRotate();
  };
}

export default Bubble;
