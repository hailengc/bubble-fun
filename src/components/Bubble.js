import { Path, Color, Point } from "paper";

function randomIn(min, max) {
  return Math.random() * (max - min) + min;
}

function randomPick(...x) {
  let r = Math.random() * x.length;
  console.log(x[Math.trunc(r)]);

  return x[Math.trunc(r)];
}

const Circle = Path.Circle;
class Bubble extends Circle {
  static isBubble(item) {
    return item.data.isBubble === true;
  }

  constructor(position, radius, rgba) {
    super(position, radius);
    this.applyMatrix = false;

    let directionX = randomPick(-1, 1);
    this.data = {
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
        degreeFactor: randomIn(0.8, 1.5)
      },
      position: {
        xFactor: randomIn(-0.4, 0.4)
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

    this.scaling = {
      x: 1.0,
      y: 1.0
    };
    this.data.baseScaling = this.scaling.clone();
    this.data.scaleDelta = {
      x: 0.0006 * this.scaling.x,
      y: 0.0006 * this.scaling.y
    };
  }
  getNextXScaling = event => {
    let prevXScaling = this.scaling.x;

    let { scaleDirection, scaleRange, scaleDelta, baseScaling } = this.data;

    if (
      prevXScaling >= baseScaling.x * scaleRange.x.max ||
      prevXScaling < baseScaling.x * scaleRange.x.min
    ) {
      scaleDirection.x *= -1;
    }
    return (
      prevXScaling +
      scaleDirection.x *
        (scaleDelta.x *
          (1 -
            Math.abs(
              this.scaling.x / baseScaling.x -
                (scaleRange.x.max + scaleRange.x.min) / 2
            ) /
              (scaleRange.x.max - scaleRange.x.min) /
              2))
    );
  };

  getNextYScaling = event => {
    let prevYScaling = this.scaling.y;
    // let { scaleDirection, scaleRange, scaleDelta, baseScaling } = this.data;
    // if (
    //   prevYScaling >= baseScaling.y * scaleRange.y.max ||
    //   prevYScaling < baseScaling.y * scaleRange.y.min
    // ) {
    //   scaleDirection.y *= -1;
    // }
    // return prevYScaling + scaleDirection.y * scaleDelta.y;
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
      this.data.scaleDelta = {
        x: 0.0006 * this.scaling.x,
        y: 0.0006 * this.scaling.y
      };
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
