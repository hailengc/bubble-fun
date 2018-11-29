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
        x: 0.0005,
        y: 0.0005
      },
      scaleRange: {
        x: 0.08,
        y: 0.08
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

    this.scaling = {
      x: 1 + Math.random() * 0.04,
      y: 1 - Math.random() * 0.04
    };
  }
  getNextXScaling = event => {
    let prevXScaling = this.scaling.x;

    let { scaleDirection, scaleRange, scaleDelta } = this.data;

    if (
      prevXScaling >= 1.0 + scaleRange.x ||
      prevXScaling < 1.0 - scaleRange.x ||
      Math.random() > 0.5
    ) {
      scaleDirection.x *= -1;
    }
    return prevXScaling + scaleDirection.x * (Math.random() * scaleDelta.x);
  };

  getNextYScaling = event => {
    let prevYScaling = this.scaling.y;
    let { scaleDirection, scaleRange, scaleDelta } = this.data;

    if (
      prevYScaling >= 1.0 + scaleRange.y ||
      prevYScaling < 1.0 - scaleRange.y ||
      Math.random() > 0.5
    ) {
      scaleDirection.y *= -1;
    }
    return prevYScaling + scaleDirection.y * (Math.random() * scaleDelta.y);
  };

  setNextScaling = event => {
    this.scaling = {
      x: this.getNextXScaling(event),
      y: this.getNextYScaling(event)
    };
  };

  setNextRotate = () => {
    this.rotate(4 * Math.random());
  };

  animate = event => {
    this.setNextScaling(event);
    this.setNextRotate();
  };
}

export default Bubble;
