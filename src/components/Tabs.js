import React, { Component, createRef } from "react";

export class Tabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      underlineWidth: 0,
      underlineLeft: 0,
    };
  }

  // REFLECTION: Find out exactly how refs work
  refCallback = (node) => {
    if (node) {
      // Hack-ish fix for production build. In production, the underline tabs doesnt work
      // Seems like the node.offsetLeft is inaccurate upon refrehsing the page.
      setTimeout(() => {
        this.setState({
          underlineLeft: node.offsetLeft,
          underlineWidth: node.getBoundingClientRect()?.width,
        });
      }, 0);
    }
  };

  render() {
    return (
      <div className="position-relative">
        <div className="d-flex">
          {this.props?.tabs?.map((tab, index) => {
            return (
              <div
                ref={
                  index === this.props.selectedIndex ? this.refCallback : null
                }
                key={index}
              >
                {tab}
              </div>
            );
          })}
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
