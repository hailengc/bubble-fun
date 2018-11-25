import React, { Component } from "react";
import Paper, { Path, Point, Color } from "paper";
import "./BubbleCanvas.less";
import Bubble from "./Bubble";

const xScaleRange = {
  min: 0.97,
  max: 1.03
};

const yScaleRange = {
  min: 0.97,
  max: 1.03
};
const xScaleDelta = 0.001;
const yScaleDelta = 0.002;

export class BubbleCanvas extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  getNextScaling(bubble) {
    let currentXScaling = bubble.scaling.x;
    let currentYScaling = bubble.scaling.y;

    if (currentXScaling >= xScaleRange.max) {
      bubble.data.xScaleFactor = -1;
    } else if (currentXScaling < xScaleRange.min) {
      bubble.data.xScaleFactor = 1;
    }
    let xs = Math.abs(bubble.data.xScaleFactor - 1.0) * xScaleDelta * 2;

    if (currentYScaling >= yScaleRange.max) {
      bubble.data.yScaleFactor = -1;
    } else if (currentYScaling < yScaleRange.min) {
      bubble.data.yScaleFactor = 1;
    }
    let ys = Math.abs(bubble.data.yScaleFactor - 1.0) * yScaleDelta * 2;

    return {
      x: currentXScaling + bubble.data.xScaleFactor * xs,
      y: currentYScaling + bubble.data.yScaleFactor * ys
    };
  }

  animate = event => {
    this.bubble.scaling = this.getNextScaling(this.bubble);
    this.bubble.rotate(3 * Math.random());

    // this.bbox = this.bbox.remove() && this.getBBoxFromBubble(this.bubble);
  };

  getBBoxFromBubble(bubble) {
    let bbox = Path.Rectangle(bubble.bounds);
    bbox.strokeColor = "black";
    return bbox;
  }

  componentDidMount = () => {
    this.canvas = document.getElementById("bubbleCanvas");
    Paper.setup(this.canvas);

    this.paperProject = Paper.project;
    this.paperView = Paper.view;

    this.paperView.onFrame = this.animate;

    // layers
    this.rasterLayer = new Paper.Layer();
    this.paintLayer = new Paper.Layer();
    this.paintLayer.activate();

    this.background = new Path.Rectangle(this.paperView.bounds);
    this.background.fillColor = "darkblue";

    // settings for the bubble
    this.bubble = new Path.Circle(new Point(400, 200), 80);
    this.bubble.applyMatrix = false;
    // this.bubble.selected = true;
    this.bubble.fillColor = {
      gradient: {
        stops: [
          [new Color(1, 1, 1, 0), 0.8],
          [new Color(1.0, 1.0, 1.0, 1.0), 1]
        ],
        radial: true
      },
      origin: this.bubble.bounds.center,
      destination: this.bubble.bounds.rightCenter
    };
    // this.bubble.strokeColor = "#eaf1fc";
    // this.bubble.strokeWidth = 5;

    this.bubble.data = {
      xScaleFactor: 1,
      yScaleFactor: -1
    };

    console.log(this.bbox);
  };

  render() {
    return (
      <div style={{ textAlign: "center" }}>
        <canvas id="bubbleCanvas" className="canvas" />
      </div>
    );
  }
}

export default BubbleCanvas;
