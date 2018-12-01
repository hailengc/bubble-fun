import { Path, Color, Point } from "paper";

const Circle = Path.Circle;
class Bubble extends Circle {
  static isBubble(item) {
    return item.data.isBubble === true;
  }

  constructor(position, radius, rgba) {
    super(position, radius);

    this.applyMatrix = false;

    this.data = {
      isBubble: true,
      moving: false,
      scaleDirection: {
        x: 1,
        y: -1
      },
      scaleDelta: {
        x: 0.0005,
        y: 0.0005
      },
      scaleRange: {
        x: 0.06,
        y: 0.06
      },
      rotation: {
        direction: Math.random() > 0.5 ? 1 : -1,
        timeFactor: Math.random() * 2 + 1,
        degreeFactor: Math.random() * 0.2 + 1
      },
      position: {
        xFactor: Math.random() * 0.8 - 0.4
      }
    };

    let { r, g, b, a } = rgba;
    this.fillColor = {
      gradient: {
        stops: [
          [new Color(r / 255, g / 255, b / 255, 0), 0.78],
          [new Color(r / 255, g / 255, b / 255, a), 1.0]
        ],
        radial: true
      },
      origin: this.bounds.center,
      destination: this.bounds.rightCenter
    };

    let { x, y } = this.data.scaleRange;
    this.scaling = {
      x: Math.random() * x * 2 - x + 1,
      y: Math.random() * y * 2 - y + 1
    };
  }
  getNextXScaling = event => {
    let prevXScaling = this.scaling.x;

    let { scaleDirection, scaleRange, scaleDelta } = this.data;

    if (
      prevXScaling >= 1.0 + scaleRange.x ||
      prevXScaling < 1.0 - scaleRange.x ||
      Math.random() > 0.6
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
      Math.random() > 0.8
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

  setNextRotate = event => {
    let { direction, timeFactor, degreeFactor } = this.data.rotation;
    let degree =
      degreeFactor *
        Math.sin((Math.PI * ((event.count / timeFactor) % 360)) / 180) +
      1.2 * degreeFactor;
    this.rotate(degree * direction);
  };

  setNextLocation = event => {
    this.position = this.position.add(
      new Point(
        Math.sin((Math.PI * ((event.count / 2) % 360)) / 180) * 0.2 +
          this.data.position.xFactor,
        -0.2
      )
    );
  };

  build = () => {
    this.buildTimer = setInterval(() => {
      this.scale(1.01);
    }, 10);
  };

  startMoving = () => {
    clearInterval(this.buildTimer);
    this.data.moving = true;
  };

  animate = event => {
    this.setNextScaling(event);
    this.setNextRotate(event);

    if (this.data.moving) {
      this.setNextLocation(event);
    }
  };
}

export default Bubble;
