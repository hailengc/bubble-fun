import React, { Component } from "react";
import Paper, { Path, Point, Color } from "paper";
import "./BubbleCanvas.less";
import Bubble from "./Bubble";

export class BubbleCanvas extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.bubbleList = [];
  }

  animate = event => {
    this.bubbleList.forEach(b => b.animate(event));
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

    // layers
    this.rasterLayer = new Paper.Layer();
    this.paintLayer = new Paper.Layer();
    this.paintLayer.activate();

    this.background = new Path.Rectangle(this.paperView.bounds);
    this.background.fillColor = "darkblue";

    this.bubbleList.push(new Bubble(new Point(400, 200), 80));
    // this.bubbleList.push(new Bubble(new Point(700, 300), 80));

    this.paperView.onFrame = this.animate;
  };

  render() {
    return (
      <div>
        <canvas id="bubbleCanvas" className="canvas" />
      </div>
    );
  }
}

export default BubbleCanvas;
