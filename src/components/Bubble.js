import { Path, Color, Point } from "paper";

function randomIn(min, max) {
  return Math.random() * (max - min) + min;
}

function randomPick(...x) {
  let r = Math.random() * x.length;
  return x[Math.trunc(r)];
}

const Circle = Path.Circle;
class Bubble extends Circle {
  static isBubble(item) {
    return item.data.isBubble === true;
  }

  static createBubble() {
    let posX = randomIn(0, 1200);
    let posY = randomIn(0, 800);
    let radius = randomIn(80, 200);
    let rgba = { r: 255, g: 255, b: 255, a: randomIn(0.3, 0.8) };
    let b = new Bubble(new Point(posX, posY), radius, rgba);
    b.startBuild();
    b.endBuild();
    return b;
  }

  constructor(position, radius, rgba) {
    super(position, radius);
    this.applyMatrix = false;

    let directionX = randomPick(-1, 1);
    this.data = {
      radius,
      isBubble: true,
      moving: false,
      scaleDirection: {
        x: directionX,
        y: -directionX
      },

      scaleRange: {
        x: {
          min: 0.97,
          max: 1.03
        },
        y: {
          min: 0.97,
          max: 1.03
        }
      },
      rotation: {
        direction: randomPick(-1, 1),
        timeFactor: randomIn(60, 60),
        degreeFactor: randomIn(0.5, 1.1)
      },
      position: {
        xFactor: randomIn(-0.4, 0.4)
      }
    };

    let { r, g, b, a } = rgba || { r: 255, g: 255, b: 255, a: 0.7 };
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

    this.scaling = {
      x: 1.0,
      y: 1.0
    };
    this.data.baseScaling = this.scaling.clone();
  }
  getNextXScaling = event => {
    let prevXScaling = this.scaling.x;

    let { scaleDirection, scaleRange, baseScaling } = this.data;

    if (
      prevXScaling >= baseScaling.x * scaleRange.x.max ||
      prevXScaling < baseScaling.x * scaleRange.x.min
    ) {
      scaleDirection.x *= -1;
    }
    return (
      prevXScaling +
      scaleDirection.x * (prevXScaling * randomIn(0.0004, 0.0008))
    );
  };

  getNextYScaling = event => {
    let prevYScaling = this.scaling.y;
    return prevYScaling;
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
      (this.scaling.x / this.data.baseScaling.x) *
        degreeFactor *
        Math.sin((Math.PI * ((event.count / timeFactor) % 360)) / 180) +
      degreeFactor;
    degree = degree * randomIn(0.9, 1.1);
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

  startBuild = () => {
    this.buildTimer = setInterval(() => {
      this.scaling = this.scaling.add(0.2);
      this.data.baseScaling = this.scaling.clone();
    }, 10);
  };

  endBuild = () => {
    clearInterval(this.buildTimer);
    this.data.moving = true;
  };

  animate = event => {
    if (this.data.moving) {
      this.setNextScaling(event);
      this.setNextRotate(event);
      this.setNextLocation(event);
    }
  };
}

export default Bubble;
