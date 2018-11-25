import React, { Component } from "react";
import BubbleCanvas from "../components/BubbleCanvas";
import "./BubbleFun.less";

export class BubbleFun extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="bubble-fun">
        <div className="bubble-canvas">
          <BubbleCanvas />
        </div>
      </div>
    );
  }
}

export default BubbleFun;
