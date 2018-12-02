import React, { Component } from "react";
import Paper, { Path, Point, Color } from "paper";
import "./BubbleCanvas.less";
import Bubble from "./Bubble";
import { ChromePicker } from "react-color";

export class BubbleCanvas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      setColor: "bbColor",
      backgroundColor: { r: 54, g: 176, b: 220 },
      bubbleColor: { r: 255, g: 255, b: 255, a: 0.6 }
    };
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
    let { r, g, b } = this.state.backgroundColor;
    this.background.fillColor = new Color(r / 255, g / 255, b / 255);

    this.paintLayer.onMouseDown = event => {
      this.buidingBubble = new Bubble(event.point, 5, this.state.bubbleColor);
      this.buidingBubble.startBuild();
      this.paintLayer.addChild(this.buidingBubble);
    };
    this.paintLayer.onMouseUp = event => {
      this.buidingBubble && this.buidingBubble.endBuild();
    };

    for (let index = 0; index < 8; index++) {
      this.paintLayer.addChild(Bubble.createBubble());
    }

    this.paperView.onFrame = this.animate;
  };

  setColorFor = e => {
    this.setState({ setColor: e.target.value });
  };

  get color() {
    if (this.state.setColor === "bkColor") {
      return this.state.backgroundColor;
    } else {
      return this.state.bubbleColor;
    }
  }

  onColorSelected = color => {
    console.log(color);

    if (this.state.setColor === "bkColor") {
      this.background.fillColor = color.hex;
      this.setState({ backgroundColor: color.rgb });
    } else {
      this.setState({ bubbleColor: color.rgb });
    }
  };

  render() {
    return (
      <div>
        <div className="title">
          Press and hold left mouse button to create bubble.
        </div>
        <canvas id="bubbleCanvas" className="canvas" />
        <div className="panel">
          <div>
            <input
              type="radio"
              value="bkColor"
              onChange={this.setColorFor}
              checked={this.state.setColor === "bkColor"}
              id="bkColor"
            />
            <label htmlFor="bkColor">Background Color</label>
            <input
              type="radio"
              value="bbColor"
              onChange={this.setColorFor}
              checked={this.state.setColor === "bbColor"}
              id="bbColor"
            />
            <label htmlFor="bbColor">Bubble Color</label>
          </div>
          <ChromePicker
            color={this.color}
            onChangeComplete={this.onColorSelected}
          />
        </div>
      </div>
    );
  }
}

export default BubbleCanvas;
