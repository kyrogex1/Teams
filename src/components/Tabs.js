import React, { Component, createRef } from "react";
import { Link } from "react-router-dom";

export class Tabs extends Component {
  constructor(props) {
    super(props);
    this.selectedRef = createRef();
    this.state = {
      underlineWidth: 0,
      underlineLeft: 0,
    };
  }

  componentDidMount() {
    // Hack-ish fix in production. For some reason, the underline doesnt work in product
    // But works in dev mode. Seems like the DOMNode's width is unreliable on mount or smth.
    setTimeout(() => {
      this.refCallbackCalledBefore = true;
      this.actualRefCallback(this.selectedDomNode);
    }, 0);
  }

  tabItem = (text, isSelected, pathLink, key) => {
    return (
      <Link
        to={pathLink}
        className={
          "text-decoration-none " + (isSelected ? "text-primary" : "text-dark")
        }
        key={key}
      >
        <div className="p-3" ref={isSelected ? this.refCallback : null}>
          <strong>{text}</strong>
        </div>
      </Link>
    );
  };

  refCallback = (node) => {
    this.selectedDomNode = node;
    if (this.refCallbackCalledBefore) {
      this.actualRefCallback(this.selectedDomNode);
    }
  };

  // REFLECTION: Find out exactly how refs work
  actualRefCallback = (node) => {
    if (node) {
      this.setState({
        underlineLeft: node.offsetLeft,
        underlineWidth: node.getBoundingClientRect()?.width,
      });
    }
  };

  render() {
    return (
      <div className="position-relative">
        <div className="d-flex">
          {this.props.tabs.map((tab, index) =>
            this.tabItem(
              tab.text,
              this.props.selected === tab,
              tab.pathLink,
              index
            )
          )}
        </div>
        <div
          className="border-bottom border-primary border-5 position-absolute tabs-underline"
          style={{
            width: this.state.underlineWidth,
            left: this.state.underlineLeft,
          }}
        ></div>
      </div>
    );
  }
}

export default Tabs;
