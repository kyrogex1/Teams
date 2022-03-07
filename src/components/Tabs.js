import React, { Component } from "react";
import { Link } from "react-router-dom";

const tabItem = (text, isSelected, pathLink, key) => {
  const classNames = isSelected
    ? "p-3 border-primary text-primary border-5 border-bottom"
    : "p-3 text-dark ";

  return (
    <Link to={pathLink} style={{ textDecoration: "none" }} key={key}>
      <div className={classNames}>
        <strong>{text}</strong>
      </div>
    </Link>
  );
};

export class Tabs extends Component {
  render() {
    return (
      <div className="d-flex">
        {this.props.tabs.map((tab, index) =>
          tabItem(tab.text, this.props.selected == tab, tab.pathLink, index)
        )}
      </div>
    );
  }
}

export default Tabs;
