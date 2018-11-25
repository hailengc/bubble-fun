import React, { Component } from "react";
import Paper, { Path, Point } from "paper";
import "./BubbleCanvas.less";

export class BubbleCanvas extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = () => {
    this.canvas = document.getElementById("bubbleCanvas");
    Paper.setup(this.canvas);

    this.paperProject = Paper.project;
    this.painterView = Paper.view;

    // layers
    this.rasterLayer = new Paper.Layer();
    this.paintLayer = new Paper.Layer();
    this.paintLayer.activate();

    var path = new Path.Circle(new Point(80, 50), 30);
    path.strokeColor = "black";
  };

  render() {
    return (
      <div style={{textAlign: 'center'}}>
        <canvas id="bubbleCanvas" className="canvas" />
      </div>
    );
  }
}

export default BubbleCanvas;
