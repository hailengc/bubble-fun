import React, { Component } from "react";
import Paper, { Path, Point, Color } from "paper";
import "./BubbleCanvas.less";
import Bubble from "./Bubble";

export class BubbleCanvas extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  animate = event => {
    this.paintLayer.children.forEach(b => {
      if (Bubble.isBubble(b)) {
        b.animate(event);
        if (!this.paperView.bounds.intersects(b.bounds)) {
          b.remove();
        }
      }
    });
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
    this.background.fillColor = "lightblue";

    this.paintLayer.onMouseDown = event => {
      this.buidingBubble = new Bubble(event.point, 5);
      this.buidingBubble.build();
      this.paintLayer.addChild(this.buidingBubble);
    };
    this.paintLayer.onMouseUp = event => {
      this.buidingBubble && this.buidingBubble.startMoving();
    };

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
